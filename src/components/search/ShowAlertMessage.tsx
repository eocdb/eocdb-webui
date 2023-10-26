import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ShowAlertMessage = ({ open, message, onClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={onClose}
        >
            <SnackbarContent style={{
                backgroundColor: '#ff9800', fontSize:"medium"
            }}
                message={message}
                action={
                    <IconButton size="medium" sx={{
                        color: "white",
                      }} onClick={onClose}>
                        <CloseIcon fontSize="medium" />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};

export default ShowAlertMessage;