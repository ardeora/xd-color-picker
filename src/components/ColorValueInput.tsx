import React from 'react';
import {Component} from 'react';

export interface ColorValueInputProps {
    value: string,
    title: string
}

export class ColorValueInput extends Component<ColorValueInputProps, {}> {
    constructor(props: ColorValueInputProps) {
        super(props)

        this.valueChanged = this.valueChanged.bind(this)
    }

    valueChanged() {

    }

    render() {
        return (
            <div className="color-value-component">
                <div>{this.props.title}</div>
                <input value={this.props.value} type="text"/>
            </div>
        )
    }
}