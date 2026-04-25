import type { SerializeContext } from '../context';

export type Handler = (props: any, ctx: SerializeContext) => string;
