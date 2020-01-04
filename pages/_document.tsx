// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import config from '../config'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />

					<meta property="twitter:card" content="summary" />
					<meta property="twitter:site" content="aviortheking" />
					<meta property="twitter:creator" content="aviortheking" />
					<meta property="twitter:site:id" content="3240791182" />
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
