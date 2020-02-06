import React from 'react'

import config from '../config'

export default class Header extends React.Component<{}, {}> {
	public render() {
		const t = `linear-gradient(90deg, ${config.colors[400]} 0%, ${config.colors[600]} 92.19%)`
		return (
			<div>
				{/* <p>Bienvenue sur le Portfolio de Florian BOUILLON !</p> */}
				<style jsx>{`
					div {
						position: relative;
						background: url('/clouds.svg'), ${t};
						background-repeat: repeat-x;
						background-position: bottom;
						min-height: 207px;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						color: white;
						font-size: 35px;
						text-transform: uppercase;
					}
				`}</style>
			</div>
		)
	}
}
