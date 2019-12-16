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
				<img src="/clouds.svg" alt=""/>


				<style jsx>{`
					div {
						position: relative;
						background: linear-gradient(90deg, #45CAFC 0%, #4285F4 92.19%);
						height: 207px;
					}
					img {
						position: absolute;
						bottom: 0;
						min-width: 100%;
						height: 50px
					}
				`}</style>
			</div>
		)
	}
}
