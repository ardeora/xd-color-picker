import React from 'react';
import {Component} from 'react';

export interface TwoDSliderProps {
    classList?: string[],
    style?: {
        background: string,
        [x: string]: string
    }
    onChange: (xPercent: number, yPercent: number) => void,
    xPos: number,
    yPos: number
}

export class TwoDSlider extends Component<TwoDSliderProps, {}> {
    private colorPickerParent: React.RefObject<HTMLDivElement>;
	private colorPickerPointer: React.RefObject<HTMLSpanElement>;
    private height: number
    private width: number


    constructor(props: TwoDSliderProps) {
        super(props)

        this.height = 200
        this.width = 200

        this.colorPickerParent = React.createRef<HTMLDivElement>()
		this.colorPickerPointer = React.createRef<HTMLSpanElement>()

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

    // When drag even occurs, Update pointer position based on mouse position inside the viewport
	dragEvent(e: MouseEvent) {
		let parent = this.colorPickerParent.current as HTMLDivElement
		let parentRect = parent.getBoundingClientRect()

		let xStart = parentRect.left
		let xEnd = xStart + parentRect.width
		let yStart = parentRect.top
		let yEnd = yStart + parentRect.height

		let x = this.constrain(xStart, xEnd, e.clientX) - xStart
		let y = this.constrain(yStart, yEnd, e.clientY) - yStart

        this.props.onChange(Math.round(x/parentRect.width*100), 100 - Math.round(y/parentRect.height*100))
	}
    // Constrains the value to a given range
	constrain(min:number, max: number, value: number): number {
		if (value < min) return min
		else if (value > max) return max
		else return value
	}

    getXPosition() {
        return this.props.xPos / 100 * this.width
    }

    getYPosition() {
        return this.height - (this.props.yPos / 100 * this.height)
    }

    render() {
        return (
            <div
            ref={this.colorPickerParent} 
            onMouseDown={e => this.addDragListener(e)}
            className='color-picker-input'>
                <div style={this.props.style} className="color-picker-fill"></div>
                <div className="color-picker-white-gradient"></div>
                <div className="color-picker-black-gradient"></div>
                <span  
                className="color-pointer"
                ref={this.colorPickerPointer}
                style={{
                    left: this.getXPosition() + 'px',
                    top: this.getYPosition() + 'px'
                }} 
                >
                </span>
            </div>
        )
    }
}