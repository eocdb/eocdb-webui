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

interface InputSliderProps extends WithStyles<typeof styles> {
    value: number;
    updateValue: (value: number) => void;

    label: string;
}

class InputSlider extends React.Component<InputSliderProps> {
    constructor(props: InputSliderProps) {
        super(props);
    }

    handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
        this.props.updateValue(value);
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.updateValue(event.target.valueAsNumber);
    };

    render() {
        const {classes, value} = this.props;

        return (
            <div className={classes.root}>
                <Typography id="label">Slider label</Typography>
                <Slider
                    classes={{container: classes.slider}}
                    value={value}
                    aria-labelledby="label"
                    onChange={this.handleSliderChange}
                />
                <TextField
                    type={"number"}
                    label={this.props.label}
                    className={classes.textField}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={value}
                />
            </div>
        );
    }
}

export default withStyles(styles)(InputSlider);