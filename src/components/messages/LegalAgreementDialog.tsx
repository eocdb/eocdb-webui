import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import CheckIcon from '@material-ui/icons/Check';
import Link from '@material-ui/core/Link';
import { SessionState } from "../../states/sessionState";


interface LegalAgreementDialogProps {
    open: boolean;

    settings: SessionState;
    updateSettings: (settings: SessionState) => void;
}


export default function LegalAgreementDialog({open, settings, updateSettings}: LegalAgreementDialogProps) {
    if (!open) {
        return null;
    }

    function handleConfirm() {
        updateSettings({...settings, legalAgreementAccepted: true});
    }

    return (
        <Dialog
            open={open}
            disableEscapeKeyDown={true}
            disableBackdropClick={true}
            onClose={handleConfirm}
            scroll='body'
        >
            <DialogTitle>{'Legal Agreement'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {'We use "HTML5 local storage" to save queries and cookies to save' +
                    'whether you are logged in. 3rd parties will never see your ' +
                    'data.'}
                </DialogContentText>
                <DialogContentText>
                    {'Find out more about local storage'}{' '}
                    <Link href={"https://en.wikipedia.org/wiki/Web_storage"} target='_blank'>{'here'}</Link>.
                </DialogContentText>
                <DialogContentText>
                    {'Find out more about cookies'}{' '}
                    <Link
                        href={"https://www.eumetsat.int/website/home/AboutUs/TermsofUse/index.html"}
                        target='_blank'
                    >
                        {'here'}
                    </Link>.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleConfirm} color="primary">
                    <CheckIcon/>
                    {'Accept and continue'}
                </Button>
            </DialogActions>

        </Dialog>
    );
}

