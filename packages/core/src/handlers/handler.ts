import { SerializeContext } from '../context';

export type Handler = (props: any, ctx: SerializeContext) => string;
