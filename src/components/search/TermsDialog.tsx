import * as React from "react";

import TERMS from './eocdb-data-access-policy';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions
} from "@mui/material";



// function Transition(props: SlideProps) {
//     return <Slide direction="up" {...props} />;
// }


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
        },
    };

    render() {
        const downloadTerms = this.props.downloadTerms;

        // const terms = downloadTerms ? TERMS[downloadTerms] : TERMS['SB'];

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onDisagree}
            >
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    {/*<ReactMarkdown options={this.options}>*/}
                    {/*    {terms}*/}
                    {/*</ReactMarkdown>*/}
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
