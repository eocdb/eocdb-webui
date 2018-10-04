import * as React from 'react';
import { Radio, RadioGroup } from "@blueprintjs/core";
import { FormEvent } from "react";


export interface RadioItem{
    label: string;
    value: string;
}


interface RadioSelectProps {
    label: string;
    handleOnChange: (event: FormEvent<HTMLInputElement>) => void;
    inline: boolean;
    items: RadioItem[];
}


interface RadioSelectState {
    value: string | undefined;
}


export class RadioSelect extends React.PureComponent<RadioSelectProps, RadioSelectState> {
    constructor(props: RadioSelectProps) {
        super(props);
        this.state = {
            value: undefined
        }
    }

    handleRadioChange = (event: FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;

        this.setState({ value })
    };

    render() {
        let radios: JSX.Element[] = [];

        let selectedValue = this.props.items[0].value;
        if(this.state.value){
            selectedValue = this.state.value;
        }

        for(let item of this.props.items){
            radios.push(<Radio {...this.state} label={item.label} key={item.value} value={item.value} />);
        }

        return (
            <RadioGroup
                label={this.props.label}
                onChange={this.handleRadioChange}
                inline={this.props.inline}
                selectedValue={selectedValue}
            >
                {radios}
            </RadioGroup>
        );
    };
}

