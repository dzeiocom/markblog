import React from 'react'

import { Component } from 'react'
import Element from '../components/Element'
import Filters from '../components/Filters'
import Post, { PostHeader } from '../components/Post'

interface Props {
	userAgent?: string
}

interface States {
	elements: Array<PostHeader>
	loaded: boolean
	asideHeight: number
	categories: Array<string>
}

// export const config = {amp: 'hybrid'}

let elements: Array<PostHeader> = []

export default class Page extends Component<Props, States> {

	public async componentDidMount() {
		const posts = await Post.fetchAll()
		const header: Array<PostHeader> = []
		const cats: Array<string> = []
		posts.forEach(el => {
			el.fetchSync()
			if (!el.header) {
				return
			}
			header.push(el.header)
			cats.push(...el.header.tags || [])
		})
		header.sort((a, b) => (a.date < b.date) ? 1 : -1)

		cats.sort((a, b) => (a < b) ? -1 : 1)

		elements = header
		this.setState({
			categories: cats.filter((item, pos) => cats.indexOf(item) === pos),
			elements: header,
			loaded: true,
		})
	}

	public render() {
		const asideHeight = this.state?.asideHeight ? this.state.asideHeight + 100 : 600
		return (
			<main>
				<span>
					{!this.state || !this.state.elements && (
						<div>Chargement en cours... <span className="emoji">😃</span></div>
					)}
					{this.state && this.state.loaded && this.state.elements.length === 0 && (
						<div>La recherche n&apos;a rien donnée <span className="emoji">😢</span></div>
					)}
					{this.state && this.state.elements && this.state.elements.map((el, index) => (
						<Element
							key={index}
							link={`/${el.category.toLowerCase()}/${el.id}`}
							title={el.title}
							image={el.image}
							alt={el.imageAlt}
							date={el.date || new Date()}
						/>
					))}
				</span>
				<Filters
					categories={this.state && this.state.categories || []}
					onQuery={this.onQuery}
					onHeight={this.onHeight}
				/>
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

					@media (min-width: 820px) and (min-height: ${asideHeight}px) {
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

	private onQuery = async (query: string, recent: boolean = true) => {
		// console.log(`query: ${query}`)
		const t = elements.filter( el => el.title.toLowerCase().includes(query.toLowerCase()))
		if (recent) {
			t.sort((a, b) => (a.date < b.date) ? 1 : -1)
		} else {
			t.sort((a, b) => (a.date > b.date) ? 1 : -1)
		}
		this.setState({
			elements: t,
		})
	}

	private onHeight = async (height: number) => {
		this.setState({
			asideHeight: height,
		})
	}
}

/*
Email configuration :D

                                  IN MX     10 srv1.dzeio.com.
                                  IN TXT    "mailconf=https://autoconfig.avior.me/mail/config-v1.1.xml"
                                  IN TXT    "v=spf1 mx ~all"
_autodiscover._tcp                IN SRV    0 0 443 autodiscover.avior.me.
_imaps._tcp                       IN SRV    0 0 143 srv1.dzeio.com.
_submission._tcp                  IN SRV    0 0 587 srv1.dzeio.com.
autoconfig                        IN CNAME  srv1.dzeio.com.
autodiscover                      IN CNAME  srv1.dzeio.com.
imap                              IN CNAME  srv1.dzeio.com.
mail                              IN CNAME  srv1.dzeio.com.
pop3                              IN CNAME  srv1.dzeio.com.
smtp                              IN CNAME  srv1.dzeio.com.

mail._domainkey                   IN TXT    ( "DKIM" )

HestiaCP

webmail                           IN CNAME srv1.dzeio.com.

*/
