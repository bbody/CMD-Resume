/* File: rollup.config.js — Rollup options for gulpfile.js (production UMD vs Karma test IIFE) */
"use strict";

var path = require("path");
var babel = require("@rollup/plugin-babel").babel;
var resolve = require("@rollup/plugin-node-resolve").default;
var commonjs = require("@rollup/plugin-commonjs");
var terser = require("rollup-plugin-terser").terser;
var pkg = require("./package.json");

function getBasePlugins(minify) {
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

	return plugins;
}

/**
 * @param {{ minify?: boolean, outDir?: string }} args
 * @returns {{ input: string, external: string[], plugins: unknown[], output: object }}
 */
function createProductionRollupConfig(args) {
	args = args || {};
	var minify = !!args.minify;
	var outDir = args.outDir || "dist";
	var fileName = minify ? "cmd-resume.min.js" : "cmd-resume.js";
	var banner = "/*! " + pkg.name + " v" + pkg.version + " | " + pkg.license + " */";

	return {
		input: "js/cmd-resume.js",
		external: ["jquery"],
		plugins: getBasePlugins(minify),
		output: {
			file: path.join(outDir, fileName),
			format: "umd",
			name: "CMDResume",
			globals: { jquery: "jQuery" },
			sourcemap: true,
			banner: banner
		}
	};
}

/**
 * @param {{ outDir?: string }} args
 * @returns {{ input: string, external: string[], plugins: unknown[], output: object }}
 */
function createTestRollupConfig(args) {
	args = args || {};
	var outDir = args.outDir || "test_tmp/js";

	return {
		input: "js/cmd-resume.test.js",
		external: ["jquery"],
		plugins: getBasePlugins(false),
		output: {
			file: path.join(outDir, "cmd-resume.test.js"),
			format: "iife",
			globals: { jquery: "jQuery" },
			sourcemap: true
		}
	};
}

module.exports = {
	createProductionRollupConfig: createProductionRollupConfig,
	createTestRollupConfig: createTestRollupConfig
};
