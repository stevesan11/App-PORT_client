const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const outputFile = "[name]";
const assetFile = "[name]";

module.exports = merge(common({ outputFile, assetFile }), {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		open: true,
		static: {
			directory: path.join(__dirname, "build"),
			watch: {
				ignored: "node_modules",
			},
		},
		compress: true,
		port: 3000,
		historyApiFallback: true /* /home/hoge に直接リンクすると表示されないためfallbackで対策 */,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
});
