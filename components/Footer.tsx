import React from 'react'
import { GitHub, Linkedin, Mail, PhoneCall, Twitter } from 'react-feather'

import config from '../config'

export default class Footer extends React.Component<{}, {}> {
	public render() {
		return (
			<footer>
				<div className="pre"></div>
				<div className="footer">
					<span>
						<a href="mailto:contact@avior.me" target="_blank">
							<Mail color={config.colors[500]} />
						</a>
						<a href="tel:+33672292683" target="_blank">
							<PhoneCall color={config.colors[500]} />
						</a>
						<a href="https://git.delta-wings.net" target="_blank">
							<GitHub color={config.colors[500]} />
						</a>
						<a href="https://twitter.com/aviortheking" target="_blank">
							<Twitter color={config.colors[500]} />
						</a>
						<a href="https://www.linkedin.com/in/florian-bouillon/" target="_blank">
							<Linkedin color={config.colors[500]} />
						</a>
					</span>
				</div>
				<style jsx>{`
					footer {
						padding-top: 50px;
					}
					.pre {
						height: 20px;
						background: #EEE;
					}
					.footer {
						display: flex;
						padding: 13px 10%;
						justify-content: space-evenly;
					}

					.footer span {
						display: flex;
						justify-content: space-evenly;
						width: 100%;
					}

					a {
						padding: 10px
					}

					@media (min-width: 850px) {
						.footer {
							padding: 20px 0
						}
						.footer span {
							width: 300px;
						}
					}
				`}</style>
			</footer>
		)
	}
}
