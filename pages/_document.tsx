import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	public static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
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
