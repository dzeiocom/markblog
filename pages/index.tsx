import Element from '../components/Element'
import Filters from '../components/Filters'
import { Component } from 'react'
import Post, { PostHeader } from '../components/Post'

interface Props {
  userAgent?: string
}

interface el extends PostHeader {}

interface States {
	elements: el[]
	loaded: boolean
	asideHeight: number
	categories: string[]
}

// export const config = {amp: 'hybrid'}

let elements: PostHeader[] = []

export default class Page extends Component<Props, States> {

	onQuery = async (query: string, recent: boolean = true) => {
		// console.log(`query: ${query}`)
		const t= elements.filter(el => {
			return el.title.toLowerCase().includes(query.toLowerCase())
		})
		if (recent) {
			t.sort((a, b) => {
				return (a.date < b.date) ? 1 : -1
			})
		} else {
			t.sort((a, b) => {
				return (a.date > b.date) ? 1 : -1
			})
		}
		this.setState({
			elements: t
		})
	}

	onHeight = async (height: number) => {
		this.setState({
			asideHeight: height
		})
	}

	async componentDidMount() {
		const posts = await Post.fetchAll()
		const header: Array<PostHeader> = []
		let cats: Array<string> = []
		posts.forEach(el => {
			el.fetchSync()
			header.push(el.header)
			cats.push(...el.header.tags)
		})
		header.sort((a, b) => {
			return (a.date < b.date) ? 1 : -1
		})

		cats.sort((a, b) => (a < b) ? -1 : 1)

		elements = header
		this.setState({
			elements: header,
			loaded: true,
			categories: cats.filter((item, pos) => {return cats.indexOf(item) === pos})
		})
	}

	render() {
		return (
			<main>
				<span>
					{this.state && this.state.elements && this.state.elements.length !== 0 ? this.state.elements.map((el, index) => (
						<Element key={index} link={"/"+el.category.toLowerCase() + "/" + el.id} title={el.title} image={el.image} alt={el.imageAlt} date={el.date || new Date} />
					)) : this.state && this.state.loaded ? (
						<div>La recherche n'a rien donnée <span className="emoji">😢</span></div>
					) : (
						<div>Chargement en cours... <span className="emoji">😃</span></div>
					)}
				</span>
				<Filters categories={this.state && this.state.categories || []} onQuery={this.onQuery} onHeight={this.onHeight}/>
				<style jsx>{`
					span:not(.emoji) {
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						flex-grow: 1;
					}

					main {
						display: flex;
						flex-direction: column;
						align-items: center;
					}

					div {
						font-size: 36px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}

					@media (min-width: 820px) and (min-height: ${this.state && this.state.asideHeight ? this.state.asideHeight+100 : 600}px) {
						span {
							max-width: calc(100% - 400px);
						}
						main {
							flex-direction: row;
							align-items: stretch;
						}
					}
				`}</style>
			</main>

		)
	}
}
