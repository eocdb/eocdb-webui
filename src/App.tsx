import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Dashboard from './containers/Dashboard';
import MessageLog from "./containers/MessageLog";

import LegalAgreementDialog from "./containers/LegalAgreementDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme(
    {
        palette: {
            primary: {
                light: '#4e5ac5',
                main: '#003194',
                dark: '#000e65',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#fafafafa'
            }
        },
    });


class App extends React.Component {
    public render() {
        return (
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="App">
                            <CssBaseline/>
                            <Dashboard/>
                            <MessageLog/>
                            <LegalAgreementDialog/>
                        </div>
                    </LocalizationProvider>
                </ThemeProvider>
        );
    }
}

export default App;
