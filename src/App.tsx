import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './containers/Dashboard';


class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <CssBaseline/>
                <Dashboard/>
            </div>
        );
    }
}

export default App;
