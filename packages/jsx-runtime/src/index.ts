// Some stubs for the JSX runtime to replace react/jsx-runtime in the esbuild bundle for dynamic pages.

export const Fragment = 'fragment';
export const jsx = (type: any, props: any) => ({ type, props });
export const jsxs = jsx;
export const createElement = jsx;
