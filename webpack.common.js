const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = ({ outputFile, assetFile }) => ({
	entry: path.resolve(__dirname, "src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: `js/${outputFile}.js`,
		chunkFilename: `js/${outputFile}.js`,
	},
	plugins: [
		new ESLintPlugin({
			extensions: [".ts", ".tsx", ".js"],
			exclude: "node_modules",
		}),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: `asset/${assetFile}[ext]`,
				},
			},
		],
	},
	resolve: {
		modules: [path.resolve(__dirname, "node_modules")],
		extensions: [".tsx", ".ts,", ".js"],
	},
	optimization: {
		splitChunks: {
			// chunks: "all",
			// minSize: 20000,
			// minRemainingSize: 0,
			// minChunks: 1,
			// maxAsyncRequests: 30,
			// maxInitialRequests: 30,
			// enforceSizeThreshold: 50000,
			cacheGroups: {
				vendors: {
					name: "vendors",
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					reuseExistingChunk: true,
				},
				default: {
					chunks: "all",
					reuseExistingChunk: true,
				},
			},
		},
	},
	stats: {
		children: true,
	},
});
