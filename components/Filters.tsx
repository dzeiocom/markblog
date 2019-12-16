import React from 'react'
import Link from 'next/link'
import Category from './interfaces/Category'
import '../styl/styl.styl'
import { ChevronRight } from 'react-feather'
import Router from 'next/router'

interface Props {
	categories?: Category[]
	onQuery?: (query: string) => void
	onHeight?: (height: number) => void
}

interface States {
	follow?: boolean
	height?: number
}

export default class Filters extends React.Component<Props, States> {

	private aside = undefined
	private input = undefined

	constructor(props: Props) {
		super(props)
	}

	setRef = element => {
		this.aside = element
	}

	setInput = element => {
		this.input = element
	}

	onScroll = () => {
		this.setState({
			follow: window.pageYOffset > 217
		})
	}

	onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		setTimeout(() => {
			this.submit()
		}, 1);
	}

	onClick = () => {
		if (this.input.value !== "") {
			this.submit()
			return
		}
		this.input.focus()
	}

	submit = () => {
		if (this.props.onQuery) this.props.onQuery(this.input.value)
	}


	componentDidMount() {
		this.onScroll()
		this.setState({
			height: this.aside.clientHeight
		})
		if (this.props.onHeight) this.props.onHeight(this.aside.clientHeight)
		window.addEventListener('scroll', this.onScroll)

	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}

	render() {
		return (
			<aside ref={this.setRef} className={this.state && this.state.follow ? "follow" : ""}>
				<div>Trier</div>
				<div className="input icon-right">
					<select>
						<option value="plus récant au moins récent"></option>
					</select>
				</div>
				<div>Filtrer</div>
				<div className="input icon-right">
					<input placeholder="ex: dzeio.com" type="text" ref={this.setInput} onKeyDownCapture={this.onKeyDown} />
					<i>
						<ChevronRight onClick={this.onClick} />
					</i>
				</div>
				<p>Languages :</p>
				{this.props.categories.map(cat => (
				<Link key={cat.slug} href={cat.slug}>
					<a>{cat.name}</a>
				</Link>
			))}

				<style jsx>{`

					aside {
						padding: 5% 3% 0;
					}

				@media (min-width: 820px) and (min-height: ${this.state && this.state.height ? this.state.height+100 : 600}px) {
						aside {
							position: absolute;
							min-width: calc(400px - 6%);
							right: 0;
						}


						aside.follow {
							position: fixed;
							top: 70px;
						}
					}


					.input {
						display: flex;
						justify-content: center;
						margin: 20px 0;
					}

					div:not(.input) {
						display: block;
						padding: 20px;
						margin: 10px 0;
						background: linear-gradient(90deg, #45CAFC 0%, #4285F4 92.19%);
						color: white;
						font-size: 24px;
						text-transform: uppercase;
						font-weight: 500;
						text-align: center;
						border-radius: 10px;
					}
					a {
						padding: 7px 12px;
						background: #4285F4;
						color: white;
						text-transform: uppercase;
						border-radius: 10px;
						font-size: 20px;
						text-decoration: none;
						display: inline-block;

						transition: background 200ms
					}

					a:hover {
						background: #45CAFC;
					}

				`}</style>
			</aside>
		)
	}
}
