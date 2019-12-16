import { NextPage, NextPageContext } from "next"

import React from 'react'
import Post from "../../components/Post"
import ReactMarkdown from 'react-markdown'

interface Props {
	post: Post
}

const PostPage: NextPage<Props> = (props: Props) => {
	// React.
	return (
		<main>
			<ReactMarkdown source={props.post.content}/>
		</main>
	)
}

PostPage.getInitialProps = async (context: NextPageContext) => {
	const { slug } = context.query
	if (typeof slug === "object") throw new Error("Slug is not correct")
	const post = new Post(slug)
	await post.fetch()
	return {post}
}

export default PostPage
