import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './containers/Dashboard';
import MessageLog from "./containers/MessageLog";


class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <CssBaseline/>
                <Dashboard/>
                <MessageLog/>
            </div>
        );
    }
}

export default App;
