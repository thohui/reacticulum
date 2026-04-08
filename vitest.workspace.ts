import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	{
		test: {
			globals: true,
			include: ['packages/*/src/**/*.test.{ts,tsx}'],
		},
	},
]);
