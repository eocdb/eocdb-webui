import * as React from "react";
import { SliderRange } from "../../types/advancedSearchDialog";
import { TextField, Slider } from "@mui/material";


// const styles = (theme: Theme) => createStyles({
//     root: {},
//     slider: {
//         padding: '22px 0px',
//         margin: theme.spacing.unit,
//         size: '100pt',
//     },
//     textField: {
//         width: 200,
//         marginTop: theme.spacing.unit / 2,
//         marginRight: theme.spacing.unit / 2,
//     },
// });

interface MinMaxInputSliderProps {
    value: SliderRange;
    onChange: (value: SliderRange) => void;

    label: string;
}


class MinMaxInputSlider extends React.Component<MinMaxInputSliderProps> {
    constructor(props: MinMaxInputSliderProps) {
        super(props);
    }

    handleSliderChange = (value: SliderRange) => {
        this.props.onChange(value);
    };

    handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: SliderRange = [event.target.valueAsNumber, this.props.value[1]];
        this.props.onChange(value);
    };

    handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: SliderRange = [this.props.value[0], event.target.valueAsNumber];
        this.props.onChange(value);
    };

    render() {
        const {value} = this.props;

        return (

            <div>
                <Slider
                    min={0}
                    max={1000}
                    value={value}
                    // onChangeComplete={this.handleSliderChange}
                    //onChangeComplete={this.handleChangeComplete}
                />
                <TextField
                    type={"number"}
                    label={this.props.label + ' Min'}
                    // className={classes.textField}
                    variant="outlined"
                    value={value[0]}
                    onChange={this.handleMinInputChange}
                />
                <TextField
                    //type={"number"}
                    label={this.props.label + ' Max'}
                    // className={classes.textField}
                    variant="outlined"
                    value={value[1]}
                    onChange={this.handleMaxInputChange}
                />
            </div>
        );
    }
}

export default MinMaxInputSlider;
