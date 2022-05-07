/* eslint-disable no-undef */
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	resolver: 'ts-jest-resolver',
	moduleNameMapper: {
		'^@ostrich-app/(.*)$': '<rootDir>/src/$1',
		'^@ostrich-app-app': '<rootDir>/src/app',
		'^@ostrich-app-config': '<rootDir>/src/config',
		'^@ostrich-app-api/(.*)$': '<rootDir>/src/api/$1',
		'^@ostrich-app-setup': '<rootDir>/src/setup',
		'^@ostrich-app-setup/(.*)$': '<rootDir>/src/setup/$1',
		'^@ostrich-app-features/(.*)$': 'src/features/$1',
		'^@ostrich-app-models/(.*)$': '<rootDir>/src/models/$1',
		'^@ostrich-app-common/(.*)$': '<rootDir>/src/common/$1',
		'^@ostrich-app-services/(.*)$': '<rootDir>/src/services/$1',
		'^@ostrich-app-helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^@ostrich-app-utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@ostrich-app-constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@ostrich-app-uploadSDK': '<rootDir>/src/uploadSDK',
		'^@ostrich-app-uploader': '<rootDir>/src/uploader',
		'^@ostrich-app-db/(.*)$': '<rootDir>/src/databases/$1',
		'^@ostrich-app-middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
	},

	coveragePathIgnorePatterns: ['/node_modules/'],
	// moduleDirectories: ["node_modules", "./", "./src", "./src/domains"],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
	notify: false,
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test).[tj]s?(x)',
	],

	testPathIgnorePatterns: ['/node_modules/'],

	transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
};
