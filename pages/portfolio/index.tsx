import { NextPage, NextPageContext } from "next"
import Link from 'next/link'
import Post from "../../components/Post"
// import posts from '../../posts/pages.json'
// import firstline from 'firstline'
// import 'fs'

interface Props {
	files: fileInformations[]
}

interface fileInformations {
	title: string
	slug: string
}

const PortfolioIndex: NextPage<Props> = (props: Props) => {

	const el: JSX.Element[] = []
	for (const post of props.files) {
		el.push(
		)
	}

	return (
		<ul>
			{props.files.map(post => (
				<li key={post.slug}>
					<Link href="/portfolio/[slug]" as={`/portfolio/${post.slug}`}>
						<a>{post.title}</a>
					</Link>
				</li>
			))}
		</ul>

	)
}

PortfolioIndex.getInitialProps = async (context: NextPageContext) => {
	const arr: fileInformations[] = []
	for (const post of await Post.fetchAll()) {
		if (!post.isStarted) await post.fetch()
		arr.push({
			slug: post.slug,
			title: post.title
		})
	}
	return {files: arr}
}

export default PortfolioIndex

function l(args: any) {
	console.log(arguments)
}

async function test() {
}
