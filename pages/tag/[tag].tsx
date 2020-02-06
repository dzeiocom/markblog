import React from 'react'
import { NextPage, NextPageContext } from 'next'

import Element from '../../components/Element'
import Post from '../../components/Post'

import Error from '../_error'

interface Props {
	files: Array<Post>
	tag: string
}

const PortfolioIndex: NextPage<Props> = (props: Props) => {

	if (props.files.length === 0) {
		return (
			<Error statusCode={404} />
		)
	}

	return (
		<div>
			<h2>Tag: {props && props.tag}</h2>
			<div>
				{props.files.map((post, index) => {
					if (!post.header) {
						return
					}
					return (
						<Element
							key={index}
							link={`/${post.header.category.toLowerCase()}/${post.header.id}`}
							title={post.header.title}
							image={post.header.image}
							date={post.header.date || new Date()}
						/>
					)
				})}
			</div>
			<style jsx>{`
			span:not(.emoji) {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				flex-grow: 1;
			}
			div div {
				display: flex;
				flex-direction: row;
			}
			div {
				display: flex;
				flex-direction: column;
			}
			h2 {
				display: inline-block;
				padding: 20px;
				margin: auto;
				background: linear-gradient(90deg, #45CAFC 0%, #4285F4 92.19%);
				color: white;
				font-size: 24px;
				text-transform: uppercase;
				font-weight: 500;
				text-align: center;
				border-radius: 10px;
			}
			`}</style>
		</div>
	)
}

PortfolioIndex.getInitialProps = async (context: NextPageContext) => {
	const { tag } = context.query
	if (typeof tag === 'object' || tag === '[tag]') {
		return {files: [], tag: ''}
	}
	const arr: Array<Post> = []
	for (const post of await Post.fetchAll()) {
		if (!post.isStarted) {
			await post.fetch()
		}
		const tags = []
		if (!post.header) {
			continue
		}
		for (const tg of post.header.tags || []) {
			tags.push(tg.toLowerCase())
		}
		if (!tags.includes(tag)) {
			continue
		}
		arr.push(post)
	}
	return {files: arr, tag} as Props
}

export default PortfolioIndex
