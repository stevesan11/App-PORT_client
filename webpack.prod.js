const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";

module.exports = merge(common({ outputFile, assetFile }), {
	mode: "production",
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
			},
		}),
		new Dotenv({ path: "./.env.production" }),
	],
	optimization: {
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
});
