import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import * as React from "react";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions/ExpansionPanelActions";
import Button from "@material-ui/core/Button/Button";


interface SearchFileParamProps {
    classes: any;
    field: React.ReactNode;
    heading: string;
}


class SearchFileParam extends React.PureComponent<SearchFileParamProps> {
    render() {
        const {classes} = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>{this.props.heading}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {this.props.field}
                    </Typography>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button size="large" variant="outlined" >Apply</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    }
}

export default SearchFileParam;