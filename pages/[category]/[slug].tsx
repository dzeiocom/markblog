import { NextPageContext } from "next"

import{ Component } from 'react'
import Post from "../../components/Post"
import ReactMarkdown from 'react-markdown'
import Error from "../_error"
import Link from "next/link"

interface Props {
	post: Post
}

interface States {
	imgHeight: number
}

export default class PostPage extends Component<Props, States> {
	public render() {
		return (
			<main>
				{this.props.post === undefined ? (
					<Error statusCode={404} />
				) : (
					<div>
						<img src={this.props.post.header.image} alt={this.props.post.header.imageAlt} />
						<ReactMarkdown source={this.props.post.content}/>
						<h2>Détails</h2>
						<p>Tags:</p>
						<ul>
							{this.props.post.header.tags.map((el) => (
								<li>
									<Link href="/tag/[tag]" as={'/tag/'+el.toLowerCase()}>
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
				<style jsx global>{`
					main h1 {
						font-size: 50px;
						text-align: center;
					}
					main h2 {
						font-size: 40px;
						text-align: center;
						text-shadow: 4px 4px 0px rgba(66, 133, 244, 0.5);
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

	public static async getInitialProps(context: NextPageContext) {
		const { slug } = context.query
		if (typeof slug === "object" || slug === "[slug]") return {post: undefined}
		const post = new Post(slug)
		await post.fetch()
		return {post}
	}
}
