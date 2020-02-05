import { NextPageContext } from 'next'
import Head from 'next/head'
import React, { Component } from 'react'

interface Props {
	statusCode: number
}

const codesTexts = {
	404: 'Page non trouvé !',
	500: "Le serveur n'a pas pu répondre a ta demande :O",
}

export default class Error extends Component<Props, {}> {
	public render = () => {
		const statusCode = this.props.statusCode
		return (
			<main>
				<Head>
					<title key="title">{statusCode ? statusCode : '404'} Error - Markblog</title>
				</Head>
				<div>
					<h1>{statusCode ? statusCode : '404'}</h1>
					<h2>{statusCode ? codesTexts[statusCode] : codesTexts[404]}</h2>
				</div>
				<style jsx>{`
					div {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						height: 100%
					}

					h1 {
						font-size: 250px;
						margin: 10px;
						color: transparent;
						background: linear-gradient(90deg, #45CAFC 0%, #4285F4 92.19%);
						background-clip: text;
						-webkit-background-clip: text;
					}

				`}</style>
			</main>
		)
	}

	public static getInitialProps({ res, err }: NextPageContext) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : 404
		return { statusCode }
	}
}
