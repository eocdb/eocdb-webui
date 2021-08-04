import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './containers/Dashboard';
import MessageLog from "./containers/MessageLog";

// import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// import LuxonUtils from '@date-io/luxon';
import LegalAgreementDialog from "./containers/LegalAgreementDialog";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";


const theme = createTheme(
    {
        palette: {
            primary: {
                light: '#4e5ac5',
                main: '#003194',
                dark: '#000e65',
            },
            secondary: {
                main: '#C61162',
            },
            error: {
                main: red.A400,
            },
            background: {
                default: '#fff',
            },
        },
    });


class App extends React.Component {
    public render() {
        return (
            <ThemeProvider theme={theme}>
                {/*<MuiPickersUtilsProvider utils={LuxonUtils}>*/}
                    <div className="App">
                        <CssBaseline/>
                        <Dashboard/>
                        <MessageLog/>
                        <LegalAgreementDialog/>
                    </div>
                {/*</MuiPickersUtilsProvider>*/}
            </ThemeProvider>
        );
    }
}

export default App;
