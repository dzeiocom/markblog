import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'react-feather'

interface Props {
	title: string
	date: Date
	image?: string
	alt?: string
	link: string
}

const months = [
	'le 13eme mois',
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre',
]

export default class Element extends React.Component<Props, {}> {
	public render() {
		let date = this.props.date
		if (typeof this.props.date === 'string') {
			date = new Date(this.props.date)
		}
		const t = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
		return (
			<div>
				<Link href="/[category]/[slug]" as={this.props.link}>
					{this.props.image ? (
						<a><picture>
							<source srcSet={require(`../images${this.props.image}?webp`)} type="image/webp" />
							<source srcSet={require(`../images${this.props.image}`)} type="image/png" />
							<img src={require(`../images${this.props.image}`)} />
						</picture></a> //<img src={require(`../images${this.props.image}`/*this.props.image*/)} alt={this.props.alt}/>
					) : (
						<div></div>
					)}
				</Link>

				<i>Le {t}</i>
				<span>
					<Link href="/[category]/[slug]" as={this.props.link}>
						<a>{this.props.title}</a>
					</Link>
					<Link href="/[category]/[slug]" as={this.props.link}>
						<a><ChevronRight size={48}/></a>
					</Link>
				</span>
				<style jsx>{`
					div {
						padding: 5% 5%;
						min-width: 90%;
					}
					@media (min-width: 840px) {
						div {
							max-width: 40%;
							min-width: 400px;
						}
					}
					img {
						width: 100%;
						border-radius: 10px;
						height: 250px;
						object-fit: cover;
					}
					span {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					a, i {
						margin: 10px 0;
						display: block;
					}
					i {
						font-style: italic;
						font-size: 14px;
					}
					a {
						font-weight: bold;
						font-size: 24px;
						color: black;
						text-decoration: none;
					}
				`}</style>

			</div>

		)
	}
}
