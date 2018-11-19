import * as React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Icon from '@material-ui/core/Icon/Icon';
import SimpleTable from './SimpleTable';
import SearchMap from '../../containers/search/SearchMap';
import { DatasetQuery } from '../../api/index';


interface SearchPanelProps {
    classes: any;
    show: boolean;

    datasetQuery: DatasetQuery;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
    searchDatasets: () => void;
}


class SearchPanel extends React.PureComponent<SearchPanelProps> {
    constructor(props: SearchPanelProps) {
        super(props);
    }

    handleSearchExprChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchExpr = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, searchExpr});
    };

    handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, startDate});
    };

    handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, endDate});
    };

    render() {
        const {classes, datasetQuery} = this.props;
        const {searchExpr, startDate, endDate} = datasetQuery;

        if (!this.props.show) {
            return null;
        }

        return (
            <div className={this.props.show ? '' : classes.hidden}>
                <Grid spacing={24} container direction={'row'} justify={'flex-start'} alignItems={'center'}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id={'lucene-search'}
                            label={'Expression'}
                            variant="outlined"
                            className={classes.searchField}
                            value={searchExpr}
                            onChange={this.handleSearchExprChange}
                        />
                        <TextField
                            id="measurement-from-date"
                            label="Measured From"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={startDate}
                            onChange={this.handleStartDateChange}
                        />
                        <TextField
                            id="measurement-to-date"
                            label="Measured To"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={endDate}
                            onChange={this.handleEndDateChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} justify={'flex-end'}>
                        <Button variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.props.searchDatasets}>
                            Search
                            <Icon className={classes.rightIcon}>search</Icon>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.tableContainer}>
                            <SimpleTable/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.tableContainer}>
                            <SearchMap/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SearchPanel;