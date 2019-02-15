import * as React from "react";
import { Theme, Typography, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
//import { Slider } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

import 'rc-slider/assets/index.css';
import * as slider from 'rc-slider';


const styles = (theme: Theme) => createStyles({
    root: {},
    slider: {
        padding: '22px 0px',
        margin: theme.spacing.unit,
        size: '100pt',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

interface MinMaxInputSliderProps extends WithStyles<typeof styles> {
    value: number[];
    onChange: (value: number[]) => void;

    label: string;
}


class MinMaxInputSlider extends React.Component<MinMaxInputSliderProps> {
    constructor(props: MinMaxInputSliderProps) {
        super(props);
    }

    handleSliderChange = (value: number[]) => {
        this.props.onChange(value);
    };

    handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = [event.target.valueAsNumber, this.props.value[1]];
        this.props.onChange(value);
    };

    handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = [this.props.value[0], event.target.valueAsNumber];
        this.props.onChange(value);
    };

    render() {
        const {classes, value} = this.props;

        return (
            <div className={classes.root}>
                <Typography id="label">{this.props.label}</Typography>

                <slider.Range
                    className={classes.slider}
                    allowCross={false}
                    value={value}
                    onChange={this.handleSliderChange}
                    step={1}
                    min={0}
                    max={1000}
                />

                <TextField
                    type={"number"}
                    label={this.props.label + ' Min'}
                    className={classes.textField}
                    variant="outlined"
                    value={value[0]}
                    onChange={this.handleMinInputChange}
                />
                <TextField
                    type={"number"}
                    label={this.props.label + ' Max'}
                    className={classes.textField}
                    variant="outlined"
                    value={value[1]}
                    onChange={this.handleMaxInputChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(MinMaxInputSlider);