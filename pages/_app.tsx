import App from 'next/app'
import Head from 'next/head'
import React from 'react'

import Layout from '../components/Layout'
import config from '../config'
import '../styl/styl.styl'

class MyApp extends App {

	public componentDidMount() {
		if (window.location.origin !== config.domain && window.location.hostname !== "localhost") {
			window.location.replace(`${config.domain}${window.location.pathname}`)
		}
	}

	public render() {
		const { Component, pageProps } = this.props

		return(
			<Layout>
				<Head>
					{/* General */}
					<title key="title">{config.og.title}</title>
					<meta key="description" name="description" content={config.og.description}/>

					{/* Open Graph / Twitter */}
					<meta key="og:url" property="og:url" content={config.domain + this.props.router.asPath} />
					<meta key="og:title" property="og:title" content={config.og.title}/>
					<meta key="og:description" property="og:description" content={config.og.description}/>
					<meta key="og:type" property="og:type" content="website" />
				</Head>
				<Component {...pageProps} />
			</Layout>
		)
	}
}

export default MyApp
