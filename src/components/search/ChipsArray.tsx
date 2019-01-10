import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";
import Paper from "@material-ui/core/Paper/Paper";


export interface ChipEntry {
    key: string;
    label: string;
}

const styles = (theme: Theme) => createStyles({
    root: {},
    chip: {
        margin: theme.spacing.unit / 2,
    },
});


interface ChipsArrayProps extends WithStyles<typeof styles> {
    chipData: ChipEntry[];
    onDelete: (chip: ChipEntry) => void;
}

class ChipsArray extends React.PureComponent<ChipsArrayProps> {
    constructor(props: ChipsArrayProps) {
        super(props);
    }

    handleDelete = (chip: any) => {
        console.log(chip);
        //this.props.onDelete(chip);
    };

    render() {
        const {classes} = this.props;

        return (
            <Paper
                className={classes.root}
            >
                {
                    this.props.chipData.map(
                        (chip: ChipEntry) => {
                            return (
                                <Chip
                                    key={chip.key}
                                    label={chip.label}
                                    onDelete={this.handleDelete}
                                    className={classes.chip}
                                />
                            );
                        }
                    )
                }
            </Paper>
        )

    }

}

export default withStyles(styles)(ChipsArray);