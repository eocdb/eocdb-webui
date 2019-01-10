import * as React from "react";
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import WaveLengthSelect from "../../containers/search/WaveLengthSelect";
import { AdvancedSearchItem } from "../../types/advancedSearchDialog";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    searchField: {
        width: 300,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});

function Transition(props: AdvancedSearchDialogProps) {
    return <Slide direction="up" {...props} />;
}

export interface AdvancedSearchDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    handleClose: () => void;

    logChange: (filterLog: AdvancedSearchItem[]) => void;
    filterLog: AdvancedSearchItem[];

    leftChange: (left: number) => void;
    bottomChange: (bottom: number) => void;
    rightChange: (right: number) => void;
    topChange: (top: number) => void;
    left: number;
    bottom: number;
    right: number;
    top: number;
}

class AdvancedSearchDialog extends React.Component<AdvancedSearchDialogProps> {
    constructor(props: AdvancedSearchDialogProps) {
        super(props);
    }

    handleLogChange = (key: string, value: string) => {
        let success = false;
        const filterLog = this.props.filterLog.map(
            (log: AdvancedSearchItem) => {
                if (log.key == key) {
                    log.value = value;
                    success = true;
                }
                return log;
            }
        );

        if (!success) {
            filterLog.push({
                key: key,
                value: value,
            });
        }

        this.props.logChange(filterLog);
    };

    handleLeftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const left = event.target.valueAsNumber;
        this.handleLogChange('left', left.toString());
        this.props.leftChange(left);
    };

    handleBottomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const bottom = event.target.valueAsNumber;
        this.handleLogChange('bottom', bottom.toString());
        this.props.bottomChange(bottom);
    };

    handleRightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const right = event.target.valueAsNumber;
        this.handleLogChange('right', right.toString());
        this.props.rightChange(right);
    };

    handleTopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const top = event.target.valueAsNumber;
        this.handleLogChange('top', top.toString());
        this.props.topChange(top);
    };

    handleWaveLengthChange = () => {

    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="form-dialog-title">Advanced Search</DialogTitle>
                    <Grid spacing={24} container direction={'row'} justify={'flex-start'} alignItems={"flex-start"}>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <WaveLengthSelect currentSelect={'All'}/>
                        </Grid>
                    </Grid>
                    <DialogActions className={classes.appBar}>
                        <Button onClick={this.props.handleClose}
                                aria-label="Close"
                                variant="contained"
                                color="secondary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(AdvancedSearchDialog);

