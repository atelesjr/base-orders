import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
	moduleNameMapper: {
		'^server-only$': '<rootDir>/test/mocks/empty-module.ts',
		'^@/(.*)$': '<rootDir>/$1',
	},
};

export default createJestConfig(customJestConfig);
