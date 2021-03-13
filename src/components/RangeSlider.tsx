import React from 'react';
import {Component} from 'react';

export interface RangeSliderProps {
    classList: string[],
    style?: {
        background: string,
        [x: string]: string
    },
    onChange: (percent: number) => void,
    yPos: number
}

export class RangeSlider extends Component<RangeSliderProps, {}> {

    private colorPickerParent: React.RefObject<HTMLDivElement>;
	private colorPickerPointer: React.RefObject<HTMLSpanElement>;
    private height: number

    constructor(props: RangeSliderProps) {
        super(props)
        this.colorPickerParent = React.createRef<HTMLDivElement>()
		this.colorPickerPointer = React.createRef<HTMLSpanElement>()
        this.height = 200
        this.dragEvent = this.dragEvent.bind(this)
		this.addDragListener = this.addDragListener.bind(this)
    }

    // If mouse clicked inside range slider boundary
    // Add a drag listener to listen for mouse position
    // Remove the drag listener as soon as user releases the mouse 
    addDragListener(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		window.addEventListener('mousemove', this.dragEvent)

		const removeListenerFunc = () => {
			window.removeEventListener('mousemove', this.dragEvent)
			window.removeEventListener('mouseup', removeListenerFunc)
		}

		window.addEventListener('mouseup', removeListenerFunc)
	}

    // Constrains the value to a given range
    constrain(min:number, max: number, value: number): number {
		if (value < min) return min
		else if (value > max) return max
		else return value
	}
    
    // When drag even occurs, Update pointer position based on mouse position inside the viewport
	dragEvent(e: MouseEvent) {
		let parent = this.colorPickerParent.current as HTMLDivElement
		let parentRect = parent.getBoundingClientRect()
		let yStart = parentRect.top
		let yEnd = yStart + parentRect.height
		let y = this.constrain(yStart, yEnd, e.clientY) - yStart
        this.props.onChange((parentRect.height - y)/parentRect.height * 100)
	}

    getPosition() {
        return this.height - (this.props.yPos * this.height / 100)
    }

    render() {
        return (
            <div 
            className={`color-picker-range-slider`}
            ref={this.colorPickerParent} 
			onMouseDown={e => this.addDragListener(e)}
            >
                <div className="checkered-pattern"></div>
                <div style={this.props.style} className={`color-picker-range-bg ${this.props.classList.join(" ")}`}></div>
                <span  
                className="color-picker-range-pointer"
                ref={this.colorPickerPointer}
                style={{top: this.getPosition() + 'px'}}
                >
                </span>
            </div>
        )
    }

}