import React from 'react'
import App from 'next/app'
import '../styl/styl.styl'
import Layout from '../components/Layout'
import Head from 'next/head'
import config from '../config'

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props

		return(
			<Layout>
				<Head>
					<meta key="description" name="description" content={config.og.description}/>

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
