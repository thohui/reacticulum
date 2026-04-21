import { serve } from '@hono/node-server';
import { evalBundle, pageDefines, posix } from '@reacticulum/build';
import chokidar from 'chokidar';
import { Hono } from 'hono';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';

const encoder = new TextEncoder();

export interface ServerOptions {
	pagesDir: string;
	port?: number;
}

/**
 * Starts a development server that builds reacticulum pages on demand.
 * The server watches the pages directory for changes and notifies clients to hot reload when a change is detected.
 **/
export async function startServer({ pagesDir, port = 3000 }: ServerOptions) {
	if (await isPortInUse(port)) {
		console.error(`Port ${port} is already in use.`);
		process.exit(1);
	}

	const resolvedPagesDir = path.resolve(pagesDir);
	const clients = new Set<WritableStreamDefaultWriter<Uint8Array>>();

	const app = new Hono();

	// SSE Endpoint for clients to connect to for hot reload events.
	app.get('/__reload', (c) => {
		const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
		const writer = writable.getWriter();
		clients.add(writer);

		c.req.raw.signal.addEventListener('abort', () => {
			clients.delete(writer);
			writer.close().catch(() => {});
		});

		return new Response(readable, {
			headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
		});
	});

	// Redirect root to /index for convenience.
	app.get('/', (c) => c.redirect('/index'));

	app.get('/:page', async (c) => {
		let pageName = c.req.param('page');

		// Strip .html extension if present so both /about and /about.html will work.
		if (pageName.endsWith('.html')) {
			pageName = pageName.slice(0, -5);
		}

		console.log(`Request for page: ${pageName}`);
		const pagePath = path.join(resolvedPagesDir, `${pageName}.tsx`);

		if (!fs.existsSync(pagePath)) {
			return c.text('Page not found', 404);
		}

		const entryContents = `
			import '@reacticulum/components'
			import { renderHTML } from '@reacticulum/core'
			import * as _mod from '${posix(pagePath)}'
			const Page = _mod.default ?? _mod
			export const render = async () => {
				const tree = await Page({})
				return renderHTML(tree)
			}
		`;

		try {
			const exports = await evalBundle<{ render: () => Promise<string> }>(entryContents, resolvedPagesDir, {
				esbuildOverrides: { define: pageDefines(pageName) },
			});
			const body = await exports.render();
			return c.html(htmlEntryPoint(pageName, body));
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			return c.html(htmlEntryPoint(pageName, `<pre style="color:#f87171">${message}</pre>`), 500);
		}
	});

	// Watch the pages directory for changes and notify clients to reload when a change is detected.
	chokidar.watch(resolvedPagesDir).on('change', () => {
		const event = encoder.encode('data: reload\n\n');
		for (const client of clients) {
			client.write(event).catch(() => clients.delete(client));
		}
	});

	serve({ fetch: app.fetch, port });
	console.log(`Server running at http://localhost:${port}`);
}

function htmlEntryPoint(title: string, body: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — Reacticulum</title>
  <style>
    body { font-family: monospace; padding: 2rem; background: #1a1a1a; color: #e0e0e0; word-break: break-all; }
    h1, h2, h3 { margin: 0.5rem 0; }
    hr { border-color: #444; }
    a { color: #7eb8f7; }
    input { background: #2a2a2a; color: #e0e0e0; border: 1px solid #555; padding: 0.2rem 0.4rem; }
    label { display: inline-flex; align-items: center; gap: 0.4rem; }
  </style>
</head>
<body>
${body}
<script>
  const es = new EventSource('/__reload')
  es.onmessage = async () => {
    const html = await fetch(location.pathname).then(r => r.text())
    const doc = new DOMParser().parseFromString(html, 'text/html')
    document.body.replaceWith(doc.body)
  }
</script>
</body>
</html>`;
}

function isPortInUse(port: number): Promise<boolean> {
	return new Promise((resolve) => {
		const server = net.createServer().listen(port);
		server.on('listening', () => {
			server.close();
			resolve(false);
		});
		server.on('error', () => resolve(true));
	});
}
