const { join } = require('path');

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
	output: {
		path: join(__dirname, 'dist')
	},
	mode: process.env.NODE_ENV || 'production',
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'esbuild-loader',
				exclude: /node_modules/,
				options: {
					loader: 'ts',
					target: 'ES2019'
				}
			}
		]
	},
	// Add typechecking for TypeScript:
	plugins: [new ForkTsCheckerPlugin()],
	optimization: {
		minimizer: [
			new ESBuildMinifyPlugin({
				target: 'ES2019'
			})
		]
	}
};
