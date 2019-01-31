import * as React from "react";
import ChipsArray from "../../components/search/ChipsArray";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {}
});

interface AdvancedSearchLogProps extends WithStyles<typeof styles> {
    left: number;
    right: number;

    leftChange: (left: number) => void;
    rightChange: (left: number) => void;
}

class AdvancedSearchLog extends React.PureComponent<AdvancedSearchLogProps> {
    constructor(props: AdvancedSearchLogProps) {
        super(props);
    }

    getFilterChipEntries() {
        let chips = [];

        if (this.props.left !== 0) {
            const label = 'left: ' + "" + this.props.left;
            chips.push({key: 'left', label: label});
        }
        if (this.props.right !== 0) {
            const label = 'right: ' + "" + this.props.right;
            chips.push({key: 'right', label: label});
        }

        return chips;
    }

    handleFilterDelete = (key: string) => {
        switch (key) {
            case 'left': {
                return this.props.leftChange(0);
            }
            case 'right': {
                return this.props.rightChange(0);
            }
        }
    };

    render() {
        return (
            <ChipsArray chipData={this.getFilterChipEntries()} onDelete={this.handleFilterDelete}/>
        );
    }
}

export default withStyles(styles)(AdvancedSearchLog);