import * as React from "react";
import {
    Button,
    Dialog,

    DialogActions, DialogContent,
    DialogTitle,
    Slide,
    Typography,
} from "@material-ui/core";
import { SlideProps } from "@material-ui/core/Slide";
import ReactMarkdown from "markdown-to-jsx";

import TERMS from './eocdb-data-access-policy';


/*
const styles = (theme: Theme) => createStyles({
    dialogContent: {
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    listItem: {
        marginTop: theme.spacing.unit,
    },
    button: {},
    rightIcon: {},
});
*/


function Transition(props: SlideProps) {
    return <Slide direction="up" {...props} />;
}


interface TermsDialogProps {
    open: boolean;
    onDisagree: () => void;
    onAgree: () => void;
}


export class TermsDialog extends React.Component<TermsDialogProps> {
    constructor(props: TermsDialogProps) {
        super(props);
    }

    options = {
        overrides: {
            h1: {component: (props: any) => <Typography gutterBottom variant="h4" {...props} />},
            h2: {component: (props: any) => <Typography gutterBottom variant="h6" {...props} />},
            h3: {component: (props: any) => <Typography gutterBottom variant="subtitle1" {...props} />},
            h4: {component: (props: any) => <Typography gutterBottom variant="caption" paragraph {...props} />},
            p: {component: (props: any) => <Typography paragraph {...props} />},
            /*li: {
                component: withStyles(styles)(({ classes, ...props }: any) => (
                    <li className={this.props.classes.listItem}>
                        <Typography component="span" {...props} />
                    </li>
                )),
            },*/
        },
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onDisagree}
                TransitionComponent={Transition}
            >
                <DialogTitle id="form-dialog-title">OCDB Download Terms and Conditions</DialogTitle>
                <DialogContent>
                    <ReactMarkdown options={this.options}>
                        {TERMS}
                    </ReactMarkdown>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onAgree}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Agree
                    </Button>
                    <Button onClick={this.props.onDisagree}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Disagree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default TermsDialog;
