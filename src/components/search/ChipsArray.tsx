import * as React from "react";
import { Chip, Paper } from "@mui/material";


export interface ChipEntry {
    key: string;
    label: string;
}

// const styles = (theme: Theme) => createStyles({
//     root: {
//         marginBottom: theme.spacing.unit,
//     },
//     chip: {
//         margin: theme.spacing.unit / 2,
//     },
// });


interface ChipsArrayProps {
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
        return (
            <Paper>
                {
                    this.props.chipData.map(
                        (chip: ChipEntry) => {
                            return (
                                <Chip
                                    key={chip.key}
                                    label={chip.label}
                                    onDelete={() => this.handleDelete(chip.key)}
                                    // className={classes.chip}
                                />
                            );
                        }
                    )
                }
            </Paper>
        )

    }

}

export default ChipsArray;
