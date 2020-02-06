import Link from 'next/link'
import React from 'react'

import config from '../config'

export default class Menu extends React.Component<{}, {}> {
	public render() {
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
					background: ${config.colors[500]}20
					}
			`}</style>
			</ul>
		)
	}
}
