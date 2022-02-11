import React from 'react';
import { SessionState } from "../../states/sessionState";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { Check } from "@mui/icons-material";


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
            // disableBackdropClick={true}
            onClose={handleConfirm}
            scroll='body'
        >
            <DialogTitle>{''}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {'By using this site you agree to '}
                    <Link href={"https://en.wikipedia.org/wiki/Web_storage"}
                          target='_blank'>
                        {'HTML5 local storage'}
                    </Link>
                    {' as well as the use of cookies.' +
                    ' To learn more about what information EUMETSAT collects and how it is used, please view '}
                    <Link href={"https://www.eumetsat.int/website/home/AboutUs/TermsofUse/index.html"}>
                        {'our Terms of Use'}
                    </Link>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleConfirm} color="primary">
                    <Check/>
                    {'Accept and continue'}
                </Button>
            </DialogActions>

        </Dialog>
    );
}

