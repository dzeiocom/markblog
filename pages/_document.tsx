import Document, { Head, Html, Main, NextScript } from 'next/document'
import config from '../config'

class MyDocument extends Document {
	public static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	public componentDidMount() {
		if (window.location.origin !== config.domain && window.location.hostname !== "localhost") {
			window.location.replace(`${config.domain}${window.location.pathname}`)
		}
	}

	public render() {
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
