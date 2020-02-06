import React, { Component, CSSProperties } from 'react'

interface Props {
	src: string
	alt?: string
	style?: CSSProperties
	parentStyle?: CSSProperties
}

export default class Picture extends Component<Props, {}> {
	public render() {
		const sets = require(`../images${this.props.src}?resize&sizes[]=300&sizes[]=600&sizes[]=1000`)
		return (
			<picture style={this.props.parentStyle}>
				<source srcSet={require(`../images${this.props.src}?webp`).default} type="image/webp" />
				<img
					srcSet={sets.srcSet}
					src={sets.src}
					alt={this.props.alt}
					style={
						Object.assign({width: '100%', objectFit: 'cover'}, this.props.style)
					} />
			</picture>
		)
	}
}
