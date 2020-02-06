import Link from 'next/link'
import React, { RefObject, FormEvent } from 'react'
import { ChevronDown, ChevronRight } from 'react-feather'

import config from '../config'
import '../styl/styl.styl'

interface Props {
	categories?: Array<string>
	onQuery?: (query: string, sort?: boolean) => void
	onHeight?: (height: number) => void
}

interface States {
	follow?: boolean
	height?: number
}

export default class Filters extends React.Component<Props, States> {

	private input: RefObject<HTMLInputElement>

	public constructor(props: Props) {
		super(props)

		this.input = React.createRef()
	}

	public render() {
		return (
			<aside>
				<label htmlFor="sidebar-sort">Trier</label>
				<div className="input icon-right">
					<select onChangeCapture={this.onChange} id="sidebar-sort">
						<option value="true">plus récent au moins récent</option>
						<option value="false">moins récent au plus récent</option>
					</select>
					<i>
						<ChevronDown />
					</i>
				</div>
				<label htmlFor="sidebar-filter">Filtrer</label>
				<div className="input icon-right inline">
					<input
						id="sidebar-filter"
						placeholder="ex: dzeio.com"
						type="text"
						ref={this.input}
						onKeyDownCapture={this.onKeyDown}
					/>
					<i>
						<ChevronRight onClick={this.onClick} />
					</i>
				</div>
				<p>Languages :</p>
				<span>
					{this.props.categories?.map(cat => (
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

					div:not(.input), label {
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

	private onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		setTimeout(() => {
			this.submit()
		}, 1)
	}

	private onClick = () => {
		if (this.input.current?.value !== '') {
			this.submit()
			return
		}
		this.input.current.focus()
	}

	private onChange = (ev: React.KeyboardEvent<HTMLInputElement>|FormEvent<HTMLSelectElement>) => {
		this.submit((ev.target as HTMLInputElement).value === 'true')
	}

	private submit = (sort?: boolean) => {
		if (this.props.onQuery && this.input.current?.value) {
			this.props.onQuery(this.input.current.value, sort)
		}
	}
}
