/* eslint-disable no-undef */
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aliases = require("module-alias-jest/register")
module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",

	coveragePathIgnorePatterns: ["/node_modules/"],
	// moduleDirectories: ["node_modules", "./", "./src", "./src/domains"],
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
	notify: false,
	testMatch: [
		"**/__tests__/**/*.[jt]s?(x)",
		"**/?(*.)+(spec|test).[tj]s?(x)",
	],

	testPathIgnorePatterns: ["/node_modules/"],

	transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
	moduleNameMapper: aliases.jest,
}
