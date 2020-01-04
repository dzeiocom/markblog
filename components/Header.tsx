import React from 'react'

interface Props {
}

export default class Header extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props)
	}
	render() {
		return (
			<div>
				{/* <p>Bienvenue sur le Portfolio de Florian BOUILLON !</p> */}
				<style jsx>{`
					div {
						position: relative;
						background: url('/clouds.svg'), linear-gradient(90deg, #45CAFC 0%, #4285F4 92.19%);
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
					img {
						position: absolute;
						bottom: 0;
						min-width: 100%;
						height: 50px;
					}
				`}</style>
			</div>
		)
	}
}
