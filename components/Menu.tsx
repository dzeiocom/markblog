import React from 'react'
import Link from 'next/link'

interface Props {
}

export default class Menu extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props)
	}
	render() {
		return (
		<ul>
			<li>
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>
			<style jsx>{`
				ul {
					list-style: none;
					margin: 0;
					padding: 0;
				}
				li {
					background: white;
					width: calc(100% - 10px);
					padding: 5px;
				}
				a {
					color: black;
					display: block;
					text-decoration: none;
					padding: 10px;
					border-radius: 10px;
					transition: background 200ms
				}

				a:hover {
					background: #45CAFC20
				}
		`}</style>
		</ul>
		)
	}
}
