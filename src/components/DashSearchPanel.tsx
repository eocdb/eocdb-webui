import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import Divider from "@material-ui/core/Divider/Divider";
import SimpleTable from "./SimpleTable";
import SearchMap from "../containers/SearchMap";
import * as React from "react";


interface DashSearchPanelProps{
    classes: any;
}


class DashSearchPanel extends React.PureComponent<DashSearchPanelProps> {
    constructor(props: DashSearchPanelProps){
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid spacing={24} container direction={"row"} justify={'flex-start'}>
                <Grid item xs={12}>
                    <Grid container spacing={8}>
                        <Grid item xs={2}>
                            <TextField
                                id={"lucene-search"}
                                label={"Search"}
                                variant="outlined"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="measurement-from-date"
                                label="Measured From:"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="measurement-to-date"
                                label="To"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Send
                                <Icon className={classes.rightIcon}>search</Icon>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
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
        );
    }
}

export default DashSearchPanel;