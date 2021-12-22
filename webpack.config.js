const { join } = require('path')

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
  },
  mode: process.env.NODE_ENV || 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'ts',
          target: 'ES2021',
        },
      },
    ],
  },
  // Add typechecking for TypeScript:
  plugins: [new ForkTsCheckerPlugin()],
}
