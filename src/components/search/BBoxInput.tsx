import { PureComponent } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import { Theme, withStyles, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";


const styles = (theme: Theme) =>  createStyles({
    searchField: {
        width: 300,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});

interface BBoxInputProps extends WithStyles<typeof styles>{
    onBBoxChange: (left: number, bottom: number, right: number, top: number) => void;
    left: number;
    bottom: number;
    right: number;
    top: number;
}


class BBoxInput extends PureComponent<BBoxInputProps> {
    constructor(props: BBoxInputProps) {
        super(props);

    }

    handleLeftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const left = event.target.valueAsNumber;
        this.props.onBBoxChange(left, this.props.bottom, this.props.right, this.props.top);
    };

    handleBottomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const bottom = event.target.valueAsNumber;
        this.props.onBBoxChange(this.props.left, bottom, this.props.right, this.props.top);
    };

    handleRightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const right = event.target.valueAsNumber;
        this.props.onBBoxChange(this.props.left, this.props.bottom, right, this.props.top);
    };

    handleTopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const top = event.target.valueAsNumber;
        this.props.onBBoxChange(this.props.left, this.props.bottom, this.props.right, top);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    id={'bbox_left'}
                    label={'Left'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleLeftChange}
                    value={this.props.left}
                />
                <TextField
                    id={'bbox_bottom'}
                    label={'Bottom'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleBottomChange}
                    value={this.props.bottom}
                />
                <TextField
                    id={'bbox_right'}
                    label={'Right'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleRightChange}
                    value={this.props.right}
                />
                <TextField
                    id={'bbox_top'}
                    label={'Top'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleTopChange}
                    value={this.props.top}
                />
            </div>
        )
    }
}

export default withStyles(styles)(BBoxInput);