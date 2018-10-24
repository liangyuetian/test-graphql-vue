const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	baseUrl: '/', // 根域上下文目录
	outputDir: 'dist', // 构建输出目录
	assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
	lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
	runtimeCompiler: true, // 运行时版本是否需要编译
	transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
	productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
	configureWebpack: (config) => {
		// webpack配置，值位对象时会合并配置，为方法时会改写配置
		if (debug) {
			// 开发环境配置
			config.devtool = 'cheap-module-eval-source-map';
		} else {
			// 生产环境配置
		}
		Object.assign(config, {
			// 开发生产共同配置
			resolve: {
				alias: {
					'@': path.resolve(__dirname, './src'),
					'@c': path.resolve(__dirname, './src/components'),
					vue$: 'vue/dist/vue.esm.js'
				}
			},
			module: {
				rules: [
					{
						oneOf: [
							// "url" loader works like "file" loader except that it embeds assets
							// smaller than specified limit in bytes as data URLs to avoid requests.
							// A missing `test` is equivalent to a match.
							{
								test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
								loader: require.resolve('url-loader'),
								options: {
									limit: 10000,
									name: 'static/media/[name].[hash:8].[ext]'
								}
							},
							// Process JS with Babel.
							{
								test: /\.(js|jsx|mjs)$/,
								include: paths.appSrc,
								loader: require.resolve('babel-loader'),
								options: {
									// This is a feature of `babel-loader` for webpack (not Babel itself).
									// It enables caching results in ./node_modules/.cache/babel-loader/
									// directory for faster rebuilds.
									cacheDirectory: true
								}
							},
							// "postcss" loader applies autoprefixer to our CSS.
							// "css" loader resolves paths in CSS and adds assets as dependencies.
							// "style" loader turns CSS into JS modules that inject <style> tags.
							// In production, we use a plugin to extract that CSS to a file, but
							// in development "style" loader enables hot editing of CSS.
							{
								test: [ /\.css$/, /\.less$/ ],
								use: [
									require.resolve('style-loader'),
									{
										loader: require.resolve('css-loader'),
										options: {
											importLoaders: 1
										}
									},
									{
										loader: require.resolve('postcss-loader'),
										options: {
											// Necessary for external CSS imports to work
											// https://github.com/facebookincubator/create-react-app/issues/2677
											ident: 'postcss',
											plugins: () => [
												require('postcss-flexbugs-fixes'),
												autoprefixer({
													browsers: [
														'>1%',
														'last 4 versions',
														'Firefox ESR',
														'not ie < 9' // React doesn't support IE8 anyway
													],
													flexbox: 'no-2009'
												})
											]
										}
									},
									{
										loader: require.resolve('less-loader') // compiles Less to CSS
									}
								]
							},
							// "file" loader makes sure those assets get served by WebpackDevServer.
							// When you `import` an asset, you get its (virtual) filename.
							// In production, they would get copied to the `build` folder.
							// This loader doesn't use a "test" so it will catch all modules
							// that fall through the other loaders.
							{
								// Exclude `js` files to keep "css" loader working as it injects
								// its runtime that would otherwise processed through "file" loader.
								// Also exclude `html` and `json` extensions so they get processed
								// by webpacks internal loaders.
								exclude: [ /\.(js|jsx|mjs)$/, /\.html$/, /\.json$/ ],
								loader: require.resolve('file-loader')
								// options: {
								// 	name: 'static/media/[name].[hash:8].[ext]'
								// }
							}
						]
					}
				]
			}
		});
	},
	chainWebpack: (config) => {
		// webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
		if (debug) {
			// 本地开发配置
		} else {
			// 生产开发配置
		}
	},
	parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
	pluginOptions: {
		apollo: {
          enableMocks: true,
          enableEngine: true
        }
	},
	pwa: {
		// 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	},
	devServer: {
		open: true,
		host: 'localhost',
		port: 8082,
		https: false,
		hotOnly: false,
		proxy: {
			// 配置跨域
			'/api': {
				target: 'http://localhost:5001/api/',
				ws: true,
				changOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		before: (app) => {}
	},
	configureWebpack: (config) => {
		config.resolve = {
			extensions: [ '.js', '.vue', '.json', '.css', '.gql', '.ts' ],
			alias: {
				vue$: 'vue/dist/vue.esm.js',
				'@': resolve('src')
			}
		};
	}
};
