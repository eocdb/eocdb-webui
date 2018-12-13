import * as React from "react";
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import { DatasetQuery } from '../../api/index';
import MultipleSelect from "./MultipleSelect";
import { StoreInfo } from "../../types/dataset";
import Grid from "@material-ui/core/Grid/Grid";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";


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

function Transition(props: SearchAdvancedDialogProps) {
    return <Slide direction="up" {...props} />;
}

interface SearchAdvancedDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    handleClose: () => void;

    handleSearchExprChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
    datasetQuery: DatasetQuery;
    searchDataset: () => void;

    handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleProductGroupsChange: (productGroupNames: string[]) => void;

    serverInfo: StoreInfo;
}


interface SearchAdvancedDialogState{
    left: number;
    bottom: number;
    right: number;
    top: number;
}

class SearchAdvancedDialog extends React.Component<SearchAdvancedDialogProps, SearchAdvancedDialogState> {
    constructor(props: SearchAdvancedDialogProps) {
        super(props);

        this.state = {
            left: 0,
            bottom: 0,
            right: 0,
            top: 0,
        };
    }

    makeBBox(left: number, bottom: number, right: number, top: number){
        return left + ',' + bottom + ',' + right + ',' + top;
    }

    handleHandleSearchClick = () => {
        this.props.searchDataset();
        this.props.handleClose();
    };

    handleLeftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const left = event.target.valueAsNumber;

       this.setState({
           ...this.state,
           left,
       });

       const region = this.makeBBox(left, this.state.bottom, this.state.right, this.state.top);

       this.props.updateDatasetQuery({...this.props.datasetQuery, region});
    };

    handleBottomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const bottom = event.target.valueAsNumber;

        this.setState({
            ...this.state,
            bottom,
        });

        const region = this.makeBBox(this.state.left, bottom, this.state.right, this.state.top);

        this.props.updateDatasetQuery({...this.props.datasetQuery, region});
    };

    handleRightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const right = event.target.valueAsNumber;

        this.setState({
            ...this.state,
            right,
        });

        const region = this.makeBBox(this.state.left, this.state.bottom, right, this.state.top);

        this.props.updateDatasetQuery({...this.props.datasetQuery, region});
    };

    handleTopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const top = event.target.valueAsNumber;

        this.setState({
            ...this.state,
            top,
        });

        const region = this.makeBBox(this.state.left, this.state.bottom, this.state.right, top);

        this.props.updateDatasetQuery({...this.props.datasetQuery, region});
    };

    render() {
        const {classes, datasetQuery} = this.props;
        const {searchExpr, startDate, endDate} = datasetQuery;
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
                        <Grid item xs={12} sm={10}>
                            <TextField
                                id={'lucene-search'}
                                key={'advlucene-search'}
                                label={'Expression'}
                                variant="outlined"
                                className={classes.searchField}
                                value={searchExpr}
                                onChange={this.props.handleSearchExprChange}
                            />
                            <TextField
                                id="measurement-from-date"
                                key="advmeasurement-from-date"
                                label="Measured From"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={startDate}
                                onChange={this.props.handleStartDateChange}
                            />
                            <TextField
                                id="measurement-to-date"
                                key="advmeasurement-to-date"
                                label="Measured To"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={endDate}
                                onChange={this.props.handleEndDateChange}
                            />
                            <MultipleSelect
                                productGroups={this.props.serverInfo['productGroups']}
                                productGroupsChange={this.props.handleProductGroupsChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                id={'bbox_left'}
                                label={'Left'}
                                variant={'outlined'}
                                type={"number"}
                                className={classes.searchField}
                                onChange={this.handleLeftChange}
                            />
                            <TextField
                                id={'bbox_bottom'}
                                label={'Bottom'}
                                variant={'outlined'}
                                type={"number"}
                                className={classes.searchField}
                                onChange={this.handleBottomChange}
                            />
                            <TextField
                                id={'bbox_right'}
                                label={'Right'}
                                variant={'outlined'}
                                type={"number"}
                                className={classes.searchField}
                                onChange={this.handleRightChange}
                            />
                            <TextField
                                id={'bbox_top'}
                                label={'Top'}
                                variant={'outlined'}
                                type={"number"}
                                className={classes.searchField}
                                onChange={this.handleTopChange}
                            />
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
                        <Button onClick={this.handleHandleSearchClick}
                                variant="contained"
                                color="secondary">
                            Search
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(SearchAdvancedDialog);

