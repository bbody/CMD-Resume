/* File: rollup.config.js — factory for Rollup input + output (used from gulpfile.js) */
"use strict";

var path = require("path");
var babel = require("@rollup/plugin-babel").babel;
var resolve = require("@rollup/plugin-node-resolve").default;
var commonjs = require("@rollup/plugin-commonjs");
var terser = require("rollup-plugin-terser").terser;
var pkg = require("./package.json");

/**
 * @param {{ minify?: boolean, outDir?: string, test?: boolean }} args
 * @returns {object} Rollup input options plus `output` for bundle.write()
 */
module.exports = function rollupConfigFactory(args) {
	args = args || {};
	var test = !!args.test;
	var minify = !test && !!args.minify;
	var outDir = args.outDir || (test ? "test_tmp/js" : "dist");
	var input = test ? "js/cmd-resume.test.js" : "js/cmd-resume.js";
	var fileName = test ? "cmd-resume.test.js" : (minify ? "cmd-resume.min.js" : "cmd-resume.js");
	var banner = test ? undefined : ("/*! " + pkg.name + " v" + pkg.version + " | " + pkg.license + " */");

	var plugins = [
		resolve({ browser: true }),
		commonjs(),
		babel({
			babelHelpers: "bundled",
			exclude: "node_modules/**",
			presets: [
				[
					"@babel/preset-env",
					{
						targets: { ie: "11" },
						useBuiltIns: false
					}
				]
			]
		})
	];

	if (minify) {
		plugins.push(
			terser({
				ecma: 5,
				numWorkers: 1,
				output: { comments: /^!/ }
			})
		);
	}

	var output = {
		file: path.join(outDir, fileName),
		format: test ? "iife" : "umd",
		globals: { jquery: "jQuery" },
		sourcemap: true
	};

	if (!test) {
		output.name = "CMDResume";
		output.banner = banner;
	}

	return {
		input: input,
		external: ["jquery"],
		plugins: plugins,
		output: output
	};
};
