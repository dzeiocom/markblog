import React from 'react'

import { NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import emoji from 'node-emoji'
import { Component } from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import Post from '../../components/Post'
import Picture from '../../components/Picture'
import config from '../../config'

import Error from '../_error'

interface Props {
	post: Post
}

interface States {
	imgHeight: number
}

export default class PostPage extends Component<Props, States> {

	public static async getInitialProps(context: NextPageContext) {
		const { slug, category } = context.query
		if (
			typeof slug === 'object' ||
			slug === '[slug]' ||
			typeof category === 'object' ||
			category === '[category]'
		) {
			return {post: undefined}
		}
		const post = new Post(`${category}/${slug}`)
		await post.fetch()
		return {post}
	}

	public render() {
		if (!this.props.post.header) {
			return (
				<Error statusCode={404} />
			)
		}
		return (
			<main>
				<Head>
					<title key="title">{`${this.props.post.title} - ${config.og.title}`}</title>
					<meta
						key="description"
						name="og:description"
						content={this.props.post.header.short || this.props.post.header.title}
					/>

					<meta
						key="og:title"
						property="og:title"
						content={`${this.props.post.header.title} - ${config.og.title}`}
					/>
					<title key="title">{`${this.props.post.header.title} - ${config.og.title}`}</title>
					<meta
						key="og:description"
						property="og:description"
						content={this.props.post.header.short || this.props.post.header.title}
					/>
					{this.props.post.header.image ? (
						<meta
							key="og:image"
							property="og:image"
							content={`${config.domain}${this.props.post.header.image}`}
						/>
					) : undefined}
					<script
						type="application/javascript"
						async
						defer
						src="https://hashover.dzeio.com/comments.php"
					></script>
				</Head>
				{this.props.post === undefined ? (
					<Error statusCode={404} />
				) : (
					<div>
						<Picture
							src={this.props.post.header.image || ''}
							alt={this.props.post.header.imageAlt}
							parentStyle={{zIndex: 999}}
							style={{
								maxWidth: '100%',
								borderRadius: 10,
								maxHeight: 300,
								boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.4)',
							}}
						/>
						<ReactMarkdown
							escapeHtml={false}
							source={emoji.emojify(
								this.props.post.content,
								undefined,
								(code: string, name: string) => `<span class="emoji">${code}</span>`,
							)}
						/>
						<h2>Détails</h2>
						<p>Tags:</p>
						<ul>
							{this.props.post.header.tags?.map(el => (
								<li key={el}>
									<Link href="/tag/[tag]" as={'/tag/' + el.toLowerCase()}>
										<a className="button">{el}</a>
									</Link>
								</li>
							))}
						</ul>
						{this.props.post.header.url ? (
							<a className="button outline large" href={this.props.post.header.url}>Visiter le site :D</a>
						) : undefined}
					</div>
				)}
				<section id="hashover"></section>
				<style jsx global>{`
					main h1 {
						font-size: 50px;
						text-align: center;
					}
					main h2 {
						font-size: 40px;
						text-align: center;
						text-shadow: 4px 4px 0px rgba(${config.colors.rgb500}, 0.5);
					}
					main h2::selection {
						text-shadow: 4px 4px 0px rgba(255, 255, 255, 0.5);
					}
					main p {
						text-align: justify;
					}
					.header {
						height: 250px;
					}
					@media (min-width: 820px) {
						.header {
							height: 0
						}
					}
				`}</style>
				<style jsx>{`
					#hashover {
						padding: 40px 10% 0;
					}
					main div {
						margin-top: -150px;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						padding: 0 10%;
					}
					main a.button.outline {
						align-self: center;
					}
					@media (min-width: 820px) {
						main div {
							margin-top: 0
						}
						main img {
							max-width: 750px;
						}
					}
					main img {
						z-index: 999;
						max-width: 100%;
						border-radius: 10px;
						max-height: 300px;
						box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
					}
/*
					li {
						border-radius: 10px;
						background: #4285F4;
						color: white;
						margin: 10px;
						display: inline-block;
						transition: background 200ms;
					}
					li:hover {
						background: #45CAFC;
					}
					li a {
						padding: 15px 20px;
						color: white;
						display: inline-block;
						text-decoration: none;
					}*/
					li {
						display: inline-block;
					}
				`}</style>
			</main>
		)
	}
}
