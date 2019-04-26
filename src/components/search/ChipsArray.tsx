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
    root: {
        marginBottom: theme.spacing.unit,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});


interface ChipsArrayProps extends WithStyles<typeof styles> {
    chipData: ChipEntry[];
    onDelete: (key: string) => void;
}

class ChipsArray extends React.PureComponent<ChipsArrayProps> {
    constructor(props: ChipsArrayProps) {
        super(props);
    }

    handleDelete = (key: string) => {
        this.props.onDelete(key);
    };

    render() {
        if(this.props.chipData.length == 0){
            return null;
        }
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
                                    onDelete={() => this.handleDelete(chip.key)}
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