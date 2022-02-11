import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";

import TERMS from './eocdb-data-access-policy';
import {
    SlideProps,
    Slide,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions
} from "@mui/material";


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
    return <Slide direction="up" {...props} >..</Slide>;
}


export type DownloadTerms = 'SB' | 'OA' | 'OM'

interface TermsDialogProps<T> {
    open: boolean;
    title: string;
    downloadTerms?: DownloadTerms;
    onDisagree: () => void;
    onAgree: () => void;
}


export class TermsDialog<T> extends React.Component<TermsDialogProps<T> > {
    constructor(props: TermsDialogProps<T> ) {
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
        const downloadTerms = this.props.downloadTerms;

        const terms = downloadTerms ? TERMS[downloadTerms] : TERMS['SB'];

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onDisagree}
                TransitionComponent={Transition}
            >
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <ReactMarkdown options={this.options}>
                        {terms}
                    </ReactMarkdown>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onAgree}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Accept
                    </Button>
                    <Button onClick={this.props.onDisagree}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Decline
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default TermsDialog;
