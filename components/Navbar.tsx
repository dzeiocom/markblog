import React from 'react'
import { Menu } from 'react-feather'
import { timingSafeEqual } from 'crypto'

interface Props {
	height?: number
}

interface States {
	scrolled: boolean
}

export default class Navbar extends React.Component<Props, States> {

	private height = 80

	private menuRef = undefined

	constructor(props: Props) {
		super(props)

		if (this.props.height) {
			this.height = this.props.height
		}
	}

	setRef = element => {
		this.menuRef = element
	}

	onScroll = () => {
		this.setState({
			scrolled: window.pageYOffset > 207
		})
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}

	onClick = () => {
		this.menuRef.classList.toggle("shown")
	}

	render() {
		const height = this.props.height || 80

		// if (!this.state.scrolled)

		// console.log(this.state.scrolled)
		return (
			<nav className={this.state && this.state.scrolled ? "scrolled" : ""}>
				<style jsx global>{`
					body {
						margin-top: ${height}px;
						overflow-x: hidden;
					}
				`}</style>

				<hr />
				<div className="head">
					<img src="/logo.svg" alt=""/>
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
					img {
						height: 80%;
					}
					hr {
						height: 10px;
						margin: 0;
						border: none;
						background: linear-gradient(90deg, #45CAFC 0%, #4285F4 92.19%);
					}
					.menu {
						display: none
					}
					.menu.shown {
						display: block
					}
					.head {
						display: flex;
						height: ${height-10}px;
						background: white;
						padding-left: ${height-10}px;
						justify-content: center;
						align-items: center;
					}
					img {
						flex-grow: 1;
					}
					span {
						width: ${height-10}px;
						height: ${height-10}px;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				`}</style>

			</nav>
		)
	}
}
