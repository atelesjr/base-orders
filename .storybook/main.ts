import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	stories: [
		'../components/**/*.stories.@(ts|tsx|js|jsx|mjs)',
		'../app/**/*.stories.@(ts|tsx|js|jsx|mjs)',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
};

export default config;
