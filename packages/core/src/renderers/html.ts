import { ComponentMeta } from "@reacticulum/types";
import { Renderer } from ".";
import { SerializeContext } from "../context";
import { htmlHandlers } from "../handlers/html";
import { escapeHtml } from "../utils/styles";

export const htmlRenderer: Renderer = {
	escapeText: escapeHtml,
	render(meta: ComponentMeta, props: any, ctx: SerializeContext): string {
		return htmlHandlers[meta.type](props, ctx);
	},
};
