import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'react-feather'

interface Props {
	title: string
	date: Date
	image?: string
	link: string
}

const months = [
	"le 13eme mois",
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
	'Décembre'
]

export default class Element extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props)
	}
	render() {
		return (
			<div>
				<Link href={this.props.link}>
					{this.props.image ? (
						<a><img src={this.props.image}/></a>
					) : (
						<div></div>
					)}
				</Link>

				<i>Le {this.props.date.getDate()} {months[this.props.date.getMonth()]} {this.props.date.getFullYear()}</i>
				<span>
					<Link href={this.props.link}>
						<a>{this.props.title}</a>
					</Link>
					<Link href={this.props.link}>
						<a><ChevronRight size={48}/></a>
					</Link>
				</span>
				<style jsx>{`
					div {
						padding: 5% 5%;
						max-width: 40%;
						min-width: 400px;
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
