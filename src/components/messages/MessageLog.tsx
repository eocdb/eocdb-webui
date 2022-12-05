import * as React from 'react';
import { MessageLogEntry } from '../../states/messageLogState';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


interface MessageLogProps {
    messages: MessageLogEntry[];
    hideMessage: (messageId: number) => void;
}

class MessageLog extends React.Component<MessageLogProps> {

    render() {
        const {messages, hideMessage} = this.props;
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                {
                    messages.map((messageLogEntry: MessageLogEntry) => {
                        const message = messageLogEntry.text;
                        const messageType = messageLogEntry.type;
                        const autoHideDuration = messageType == 'info' || messageType == 'success'? 6000 : null;

                        return (
                            <Snackbar key={messageLogEntry.id} open={true} autoHideDuration={autoHideDuration}
                                          onClose={() => hideMessage (messageLogEntry.id)}>
                                <Alert onClose={() => hideMessage (messageLogEntry.id)} severity={messageLogEntry.type}
                                       sx={{width: '100%'}}>
                                    {message}
                                </Alert>
                            </Snackbar>
                        );
                    })}
            </Stack>
        )
    }

}

export default MessageLog;
