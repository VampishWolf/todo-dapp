import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/", // Exclude node_modules
        "<rootDir>/dist/", // Exclude build output
        "<rootDir>/public/", // Exclude public folder
        "<rootDir>/components/ui/", // Exclude specific folder
        ".*\\.d\\.ts", // Exclude TypeScript declaration files
    ],
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        // Handle module aliases (this will match what is in tsconfig.json)
        '^@/(.*)$': '<rootDir>/$1',
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!wagmi/)', // Allow wagmi to be transformed
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)