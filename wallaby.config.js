module.exports = function (wallaby) {

	return {
		files: ["src/**/*.js?(x)", "package.json", "tests/**/*.js", "!tests/**/*.test.js?(x)"],

		tests: ["tests/**/*.test.js?(x)"],
	

		env: {
			type: "node",
			runner: "node"
		},

		testFramework: "jest",

		filesWithNoCoverageCalculated: ["tests/**/*.js", "!tests/**/*.test.js", "src/server.js"],

		compilers: {
			"**/*.js?(x)": wallaby.compilers.babel()
		}
	};
};