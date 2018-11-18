import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/Dashboard';


class App extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <div className="App">
                    <CssBaseline/>
                    <Dashboard/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
