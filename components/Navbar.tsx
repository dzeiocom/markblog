import Link from 'next/link'
import React from 'react'
import { Menu } from 'react-feather'

import config from '../config'

interface Props {
	height?: number
}

interface States {
	scrolled: boolean
}

export default class Navbar extends React.Component<Props, States> {

	private height = 80

	private menuRef = undefined

	public constructor(props: Props) {
		super(props)

		if (this.props.height) {
			this.height = this.props.height
		}
	}

	public componentDidMount() {
		if (window.location.origin !== config.domain) {
			window.location.replace(`${config.domain}${window.location.pathname}`)
		}
		window.addEventListener('scroll', this.onScroll)
	}

	public componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}

	public render() {
		const height = this.props.height || 80

		// if (!this.state.scrolled)

		// console.log(this.state.scrolled)
		return (
			<nav className={this.state && this.state.scrolled ? 'scrolled' : ''}>
				<style jsx global>{`
					body {
						margin-top: ${height}px;
						overflow-x: hidden;
					}
					.menu * {
						pointer-events: none;
					}
					.menu.shown * {
						pointer-events: initial;
					}
				`}</style>

				<hr />
				<div className="head">
					<Link href="/">
						<a><img src="/logo.svg" alt=""/></a>
					</Link>
					<span onClick={this.onClick} data-menu={this.refs.menu}>
						<Menu size={30} />
					</span>
				</div>

				<div ref={this.setRef} className="menu">
					{this.props.children}
				</div>

				<style jsx>{`
					nav {
						position: fixed;
						width: 100%;
						top: 0;
						z-index: 1000;
						transition: box-shadow 200ms
					}
					nav.scrolled {
						box-shadow: 0 0 10px 5px #00000040
					}
					a {
						height: 100%;
						flex-grow: 1;
						display: flex;
						justify-content: center;
					}
					hr {
						height: 10px;
						margin: 0;
						border: none;
						background: linear-gradient(90deg, ${config.colors[400]} 0%, ${config.colors[600]} 92.19%);
					}
					.menu {
						opacity: 0;
						pointer-event: none;
						height: 0;
						transition: opacity 200ms cubic-bezier(.2,0,.6,1);
					}
					.menu.shown {
						opacity: 1;
						height: initial;
					}
					.head {
						display: flex;
						height: ${height - 10}px;
						background: white;
						padding-left: ${height - 10}px;
						justify-content: center;
						align-items: center;
					}
					img {
						flex-grow: 1;
						height: 100%;

					}
					span {
						width: ${height - 10}px;
						height: ${height - 10}px;
						cursor: pointer;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				`}</style>

			</nav>
		)
	}

	private setRef = (element) => {
		this.menuRef = element
	}

	private onScroll = () => {
		this.setState({
			scrolled: window.pageYOffset > 207,
		})
	}

	private onClick = () => {
		this.menuRef.classList.toggle('shown')
	}
}
