import  React from 'react'

import Document, { Head, Html, Main, NextScript, DocumentContext } from 'next/document'
import config from '../config'

class MyDocument extends Document {
	public static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	public render() {
		return (
			<Html lang="en">
				<Head>
					{/* General */}
					<meta charSet="UTF-8" />
					<link rel="icon" href="/logo/32.png"/>

					{/* Web App related */}
					<link rel="manifest" href="/manifest.json" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="msapplication-starturl" content="/" />
					<meta name="theme-color" content={config.colors[500]} />

					{/* Open Graph / Twitter */}
					<meta property="twitter:card" content="summary" />
					<meta property="twitter:site" content="aviortheking" />
					<meta property="twitter:creator" content="aviortheking" />
					<meta property="twitter:site:id" content="3240791182" />

					{/* Apple Icons */}
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-touch-icon" content="/logo/512.png" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
