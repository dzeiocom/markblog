import React from 'react'
import Link from 'next/link'
import '../styl/styl.styl'
import { ChevronRight, ChevronDown } from 'react-feather'
import config from '../config'

interface Props {
	categories?: string[]
	onQuery?: (query: string, sort?: boolean) => void
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

	setInput = element => {
		this.input = element
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

	onChange = (ev) => {
		this.submit(ev.target.value === "true")
	}

	submit = (sort?: boolean) => {
		if (this.props.onQuery) this.props.onQuery(this.input.value, sort)
	}

	render() {
		return (
			<aside>
				<div>Trier</div>
				<div className="input icon-right">
					<select onChangeCapture={this.onChange}>
						<option value="true">plus récent au moins récent</option>
						<option value="false">moins récent au plus récent</option>
					</select>
					<i>
						<ChevronDown />
					</i>
				</div>
				<div>Filtrer</div>
				<div className="input icon-right inline">
					<input placeholder="ex: dzeio.com" type="text" ref={this.setInput} onKeyDownCapture={this.onKeyDown} />
					<i>
						<ChevronRight onClick={this.onClick} />
					</i>
				</div>
				<p>Languages :</p>
				<span>
					{this.props.categories.map(cat => (
						<Link key={cat} href="/tag/[tag]" as={`/tag/${cat.toLowerCase()}`}>
							<a className="button">{cat}</a>
						</Link>
					))}
				</span>


				<style jsx>{`

					aside {
						padding: 5% 3% 0;
						display: flex;
						flex-direction: column;
						max-width: 445px;
					}

					/*.input {
						display: flex;
						justify-content: center;
						margin: 20px 0;
					}*/

					span {
						display: inline-flex;
						flex-wrap: wrap;
					}
					a {
						flex-grow: 1;
					}

					div:not(.input) {
						display: block;
						padding: 20px;
						margin: 10px 0;
						background: linear-gradient(90deg, ${config.colors[400]} 0%, ${config.colors[600]} 92.19%);
						color: white;
						font-size: 24px;
						text-transform: uppercase;
						font-weight: 500;
						text-align: center;
						border-radius: 10px;
					}
					.input {
						align-self: center;
					}

				`}</style>
			</aside>
		)
	}
}
