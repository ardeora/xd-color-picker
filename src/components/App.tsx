import React from 'react';
import {Component} from 'react';

import '../styles/app.css'
import ColorPicker from './ColorPicker';
import { RGBColor } from './ColorUtil'

interface AppState {
	color: RGBColor,
	opacity: number
}

class App extends Component<{}, AppState> {

	constructor(props: {}) {
		super(props)
		this.state = {
			color: {
				red: 255,
				green: 0,
				blue: 0
			},
			opacity: 100
		}

		this.onUpdate = this.onUpdate.bind(this)
	}

	onUpdate(color: RGBColor, opacity: number) {
		this.setState({
			color,
			opacity
		})
	}

	render() {
		return (
			<div 
			className="main-wrapper"
			style={{background: `rgba(${this.state.color.red}, ${this.state.color.green}, ${this.state.color.blue}, ${this.state.opacity/100})`}}
			>
				<ColorPicker onChange={this.onUpdate} />
			</div>
			
			
		);
	}
}

export default App;