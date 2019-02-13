import * as React from "react";
import { Theme, Typography, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { Slider } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";


const styles = (theme: Theme) => createStyles({
    root: {},
    slider: {
        padding: '22px 0px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

interface MinMaxInputSliderProps extends WithStyles<typeof styles> {
    valueMin: number;
    valueMax: number;
    onChange: (valueMin: number, valueMax: number) => void;

    label: string;
}


class MinMaxInputSlider extends React.Component<MinMaxInputSliderProps> {
    constructor(props: MinMaxInputSliderProps) {
        super(props);
    }

    handleMinSliderChange = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
        this.props.onChange(value, this.props.valueMax);
    };

    handleMaxSliderChange = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
        this.props.onChange(this.props.valueMin, value);
    };

    handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.valueAsNumber, this.props.valueMax);
    };

    handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(this.props.valueMin, event.target.valueAsNumber);
    };

    render() {
        const {classes, valueMin, valueMax} = this.props;

        return (
            <div className={classes.root}>
                <Typography id="label">Slider label</Typography>
                <Slider
                    classes={{container: classes.slider}}
                    value={valueMin}
                    aria-labelledby="label"
                    onChange={this.handleMinSliderChange}
                />
                <Slider
                    classes={{container: classes.slider}}
                    value={valueMax}
                    aria-labelledby="label"
                    onChange={this.handleMaxSliderChange}
                />
                <TextField
                    type={"number"}
                    label={this.props.label}
                    className={classes.textField}
                    variant="outlined"
                    value={valueMin}
                    onChange={this.handleMinInputChange}
                />
                <TextField
                    type={"number"}
                    label={this.props.label}
                    className={classes.textField}
                    variant="outlined"
                    value={valueMax}
                    onChange={this.handleMaxInputChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(MinMaxInputSlider);