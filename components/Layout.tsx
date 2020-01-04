import React from 'react'

import config from '../config'

import Footer from './Footer'
import Header from './Header'
import Menu from './Menu'
import Navbar from './Navbar'

interface Props {
	hasHeader?: boolean
	headerChild?: JSX.Element
}

export default class Layout extends React.Component<Props, {}> {
	public render() {
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
						background: ${config.colors[500]};
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
