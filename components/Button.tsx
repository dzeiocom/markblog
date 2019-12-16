import { Component } from "react";
import { type } from "os";

import '../styl/styl.styl'


export enum ButtonType {
	NORMAL = "",
	OUTLINE = "outline",
	GHOST = "ghost"
}

interface Props {
	text: string
	type?: ButtonType
	// src: string
	// alt?: string
	// layout?: string
}

export default class DWButton extends Component<Props, {}> {

	constructor(props: Props) {
		super(props)
	}

	render() {
		return (
			<button className={this.props.type}>{this.props.text}</button>
		)
	}
}
