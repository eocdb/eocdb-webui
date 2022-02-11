import * as React from 'react';
import Dashboard from './containers/Dashboard';
import MessageLog from "./containers/MessageLog";

import LegalAgreementDialog from "./containers/LegalAgreementDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider  } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';


const theme = createTheme(
    {
        palette: {
            primary: {
                light: '#4e5ac5',
                main: '#003194',
                dark: '#000e65',
            },
        },
    });


class App extends React.Component {
    public render() {
        return (
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
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
