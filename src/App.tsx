import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './containers/Dashboard';
import MessageLog from "./containers/MessageLog";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
//import * as MomentUtils from '@date-io/moment';
//import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';


const theme = createMuiTheme(
    {
        palette: {
            type: 'light',
            primary: {
                light: '#4e5ac5',
                main: '#003194',
                dark: '#000e65',
            },
        },
        // see https://material-ui.com/style/typography/#migration-to-typography-v2
        typography: {
            useNextVariants: true,
        },
    });


class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <div className="App">
                        <CssBaseline/>
                        <Dashboard/>
                        <MessageLog/>
                    </div>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
