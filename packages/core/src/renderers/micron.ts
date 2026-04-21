import { ComponentMeta } from "@reacticulum/types";
import { Renderer } from ".";
import { SerializeContext } from "../context";
import { micronHandlers } from "../handlers/micron";
import { buildSuffix, escapeMarkdown, stylePrefix } from "../utils/styles";

export const micronRenderer: Renderer = {
	escapeText: escapeMarkdown,
	render(meta: ComponentMeta, props: any, ctx: SerializeContext): string {

		const prefixTokens = stylePrefix(props, meta.canHaveColor, meta.canHaveFormatting);

		const newlinePrefix = meta.startsWithNewLine ? '\n' : '';

		const handler = micronHandlers[meta.type];
		const content = handler(props, ctx);

		const suffixTokens = buildSuffix(props, meta.canHaveColor, meta.endsWithNewLine, meta.startsWithNewLine);

		// tokens must come after '>' not before — micron ignores styles before the heading
		// marker. any '>' here is from the handler, not user content (escapeMarkdown
		// turns user '>' into '\>').
		const body = content.replace(/^(>*)/, (_, headingMarker) => headingMarker + prefixTokens);

		return newlinePrefix + body + suffixTokens;

	},
};

