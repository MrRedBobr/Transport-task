const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
	splitChunks: {
		chunks: 'all'
	}
}

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
  const loaders = [	
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
			hmr: isDev,
			reloadAll: true
			},
		},
		'css-loader'
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}

const babelOptions = preset => {
  const opts = {
	presets: [
	  '@babel/preset-env'
	],
	plugins: [
	  '@babel/plugin-proposal-class-properties'
	]
  }

  if (preset) {
	opts.presets.push(preset)
  }

  return opts
}


const jsLoaders = () => {
  const loaders = [{
	loader: 'babel-loader',
	options: babelOptions()
  }]

  if (isDev) {
	loaders.push('eslint-loader')
  }

  return loaders
}

const plugins = () => {
  const base = [
	new HTMLWebpackPlugin({
	  template: './index.html',
	  minify: {
		collapseWhitespace: isProd
	  }
	}),
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin({
	  filename: filename('css')
	})
  ]

  if (isProd) {
	base.push(new BundleAnalyzerPlugin())
  }

  return base
}

module.exports = {
	context: path.resolve(__dirname, 'app/src'),
	mode: 'development',
	entry: {
		main: ['react-hot-loader/patch', '@babel/polyfill', './main.jsx']
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'app/dist')
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
		alias: {
			'@models': path.resolve(__dirname, 'app/src/models'),
			'@': path.resolve(__dirname, 'app/src'),
		}
	},
	optimization: optimization(),
	devServer: {
		port: 3000
	},
	devtool: isDev ? 'source-map' : '',
	plugins: plugins(),
		module: {
			rules: [
			{
				test: /\.css$/,
				exclude: /\.module.css$/,
				use: cssLoaders()
			},
			{
				// For CSS modules
				test: /\.module.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: cssLoaders('less-loader')
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.csv$/,
				use: ['csv-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript')
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react')
				}
			}
		]
	}
}