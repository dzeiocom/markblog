import React from 'react'
import Navbar from './Navbar'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'

interface Props {
	hasHeader?: boolean
	headerChild?: JSX.Element
}

export default class Layout extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props)
	}
	render() {
		return (
			<div>
				<Navbar>
					<Menu />
				</Navbar>
				{this.props.hasHeader && this.props.headerChild ? (
					<Header>{this.props.headerChild}</Header>
				) : (
					<Header />
				)}
				{this.props.children}
				<Footer />
				<style jsx>{`
					div {
						height: inherit;
						width: inherit;
					}
				`}</style>
				<style jsx global>{`
					html {
						height: 100%;
					}
					::selection {
						background: #4285F4;
						color: #FFF;
					}
					body {
						height: calc(100% - 80px)
					}
					#root, #__next {
						height: 100%;
						width : 100%;
					}
				`}</style>
			</div>

		)
	}
}
