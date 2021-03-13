import React from 'react';
import {Component} from 'react';

import { RangeSlider, RangeSliderProps } from './RangeSlider'
import { TwoDSlider, TwoDSliderProps } from './TwoDSlider'
import { RGBColor, HSBColor, HSBtoRGB } from './ColorUtil'
import { ColorValueInput } from './ColorValueInput'

interface ColorPickerState {
	currentColorRGB: RGBColor,
	currentColorHSB: HSBColor
	currentOpacity: number
}

interface ColorPickerProps {
	onChange: (color: RGBColor, opacity: number) => void
}

import '../styles/app.css'

class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {

	constructor(props: ColorPickerProps) {
		super(props)
		
		this.hueSliderChanged = this.hueSliderChanged.bind(this)
		this.opacitySliderChanged = this.opacitySliderChanged.bind(this)
		this.saturationBrightnessValueChanged = this.saturationBrightnessValueChanged.bind(this)

		this.state = {
			currentColorRGB: {red: 255, green: 0, blue: 0},
			currentColorHSB: {hue: 0, saturation: 100, brightness: 100},
			currentOpacity: 100
		}
	}

	updateChange() {
		this.props.onChange(this.state.currentColorRGB, this.state.currentOpacity)
	}

	// When Hue Slider is interacted with update current color
	hueSliderChanged(percent: number) {
		let newHue = (percent / 100) * 360
		this.setState(prevState => {
			let prevSaturation = prevState.currentColorHSB.saturation
			let prevBrightness = prevState.currentColorHSB.brightness
			return (
				{
					currentColorHSB: {
						hue: newHue,
						saturation: prevSaturation,
						brightness: prevBrightness
					},
					currentColorRGB: HSBtoRGB(newHue, prevSaturation, prevBrightness)
				}
			)
		}, this.updateChange);
	}

	// When Opacity Slider is interacted with update current opacity value
	opacitySliderChanged(percent: number) {
		this.setState({
			currentOpacity: percent
		}, this.updateChange)
	}

	// Change Saturation/Brightness Based On 2D Slider Relative Position
	saturationBrightnessValueChanged(xPercent: number, yPercent:number) {
		this.setState(prevState => {
			let prevHue = prevState.currentColorHSB.hue
			return (
				{
					currentColorHSB: {
						hue: prevHue,
						saturation: xPercent,
						brightness: yPercent
					},
					currentColorRGB: HSBtoRGB(prevHue, xPercent, yPercent)
				}
			)
		}, this.updateChange)
	}
	
	// Prop Creator Methods
	hueSliderProps(): RangeSliderProps{
		return {
			classList: ["color-picker-hue-slider"], 
			onChange: this.hueSliderChanged,
			yPos: (this.state.currentColorHSB.hue / 360) * 100
		}
	}

	opacitySliderProps(): RangeSliderProps {
		let color = this.state.currentColorRGB
		return {
			classList: [""], 
			onChange: this.opacitySliderChanged,
			yPos: this.state.currentOpacity,
			style: {
				background: `linear-gradient(to bottom, rgba(${color.red}, ${color.green}, ${color.blue}, 1), rgba(${color.red}, ${color.green}, ${color.blue}, 0))`
			}
		}
	}

	twoDSliderProps(): TwoDSliderProps {
		let color = this.state.currentColorHSB
		return {
			style: {
				background: `hsl(${color.hue}, 100%, 50%)`
			},
			onChange: this.saturationBrightnessValueChanged,
			xPos: color.saturation,
			yPos: color.brightness
		}
	}

	render() {
		return (
			<div className="color-picker-body">
				<div className="color-picker-range-container">
					<TwoDSlider {...this.twoDSliderProps()}/>
					<RangeSlider {...this.hueSliderProps()}/>
					<RangeSlider {...this.opacitySliderProps()}/>
				</div>
				<div className="color-value-container">
					<ColorValueInput value={String(this.state.currentColorRGB.red)} title="R"/>
					<ColorValueInput value={String(this.state.currentColorRGB.green)} title="G"/>
					<ColorValueInput value={String(this.state.currentColorRGB.blue)} title="B"/>
					<ColorValueInput value={String(Math.round(this.state.currentOpacity))} title="A"/>
				</div>
			</div>
			
		);
	}
}

export default ColorPicker;