import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import '../styl/styl.styl'
import Element from '../components/Element'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Filters from '../components/Filters'
import Category from '../components/interfaces/Category'
import { Component } from 'react'

interface Props {
  userAgent?: string
}

interface el {
	link: string,
	title: string,
	img: string,
	date: Date
}

interface States {
	elements: el[]
	asideHeight: number
}

// export const config = {amp: 'hybrid'}

const categories: Category[] = [
	{
		name: "test",
		slug: "pouet"
	}
]

const elements: el[] = [
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Dzeio.io, Services en ligne pour vous simplifier la vie !", img:"/sea.jpg", date: new Date()},
	{link:"/studiomoto", title:"Loram ipsum dolor sit amet", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"j'aime les licornes et leurs jolie corne", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Pokémon ! attrapez les tous !", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"abcde", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"def", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"abc", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()},
	{link:"/studiomoto", title:"Studiomoto, Site de référencement d'événement moto en France", img:"/uploads/stm.png", date: new Date()}
]

export default class Page extends Component<Props, States> {

	onQuery = (query: string) => {
		console.log(`query: ${query}`)
		const t= elements.filter(el => {
			return el.title.toLowerCase().includes(query.toLowerCase())
		})
		this.setState({
			elements: t
		})
	}

	onHeight = (height: number) => {
		this.setState({
			asideHeight: height
		})
	}

	componentDidMount() {
		this.setState({
			elements
		})
	}

	render() {
		return (
			<div>
				<Head>
					<link rel="manifest" href="/manifest.json" />
				</Head>
				<Navbar>
					<Menu />
				</Navbar>
				<Header />
				<main>
					<span>
						{this.state && this.state.elements.map((el, index) => (
							<Element key={index} link={el.link} title={el.title} image={el.img} date={el.date} />
						))}
					</span>
					<Filters categories={categories} onQuery={this.onQuery} onHeight={this.onHeight}/>
				</main>
				<style jsx>{`
					span {
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
					}
					main {
						display: flex;
						flex-direction: column;
					}

					main span {
						flex-grow: 1;
					}

				@media (min-width: 820px) and (min-height: ${this.state && this.state.asideHeight ? this.state.asideHeight+100 : 600}px) {
						main span {
							max-width: calc(100% - 400px);
						}
					}
				`}</style>
			</div>
		)
	}
}
