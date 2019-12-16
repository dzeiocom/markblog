import matter from 'gray-matter'


interface PostInterface {
	slug: string
	title: string
	content: any
}

interface PostHeader {
	title: string
}

export default class Post implements PostInterface {

	public slug: string
	public title: string
	public content: string
	public isStarted = false

	constructor(slug: string) {
		this.slug = slug
	}

	public async fetch() {
		console.log(this.slug)
		const content = await import(`../posts/${this.slug}.md`)
		const md = matter(content.default)
		this.title = md.data.title
		this.content = md.content
	}

	public fetchSync() {
		console.log(this.slug)
		const content = require(`../posts/${this.slug}.md`)
		const md = matter(content.default)
		this.title = md.data.title
		this.content = md.content
	}

	public static async fetchAll(): Promise<Post[]> {
			const files: string[] = ((require as any).context('../posts', true, /\.md$/)).keys()
			const posts: Post[] = []
			for (const file of files) {
				posts.push(
					new Post(
						file.replace(/^.*[\\\/]/, '')
							.split('.')
							.slice(0, -1)
							.join('.')
					)
				)
			}
			return posts
	}
}
