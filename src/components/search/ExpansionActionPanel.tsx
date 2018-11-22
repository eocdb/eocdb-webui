import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import * as React from "react";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions/ExpansionPanelActions";
import Button from "@material-ui/core/Button/Button";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});


interface SearchFileParamProps extends WithStyles<typeof styles>{
    heading: string;
}


class ExpansionActionPanel extends React.PureComponent<SearchFileParamProps> {
    render() {
        const {classes} = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>{this.props.heading}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {this.props.children}
                    </Typography>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button size="large" variant="outlined" >Apply</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(ExpansionActionPanel);