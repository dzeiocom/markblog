const withCSS = require('@zeit/next-stylus')
const glob = require('glob')
const withOffline = require('next-offline')
// import posts from './posts/pages.json.ts'
// const posts = require('./posts/pages.json.ts')
// const t = require('./pages/portfolio/')
module.exports = withOffline(withCSS({
	/* config options here */
	exportTrailingSlash: true,
	// cssModules: true,
	// target: 'serverless',
	webpack: function(config) {
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader'
		})
		return config
	},
	plugins: [
		["styled-jsx/babel", { "optimizeForSpeed": true }]
	],
	exportPathMap: async function() {
		const paths = {
			'/': { page: '/'},
			'/portfolio': { page: '/portfolio'},
		}

		const posts = glob.sync('./posts/**/*.md')

		posts.forEach(element => {
			element = element.replace(/^.*[\\\/]/, '')
				.split('.')
				.slice(0, -1)
				.join('.')
			paths[`/portfolio/${element}`] = { page: '/portfolio/[slug]', query: { slug: element}}
		});

		return paths
	}
}))
