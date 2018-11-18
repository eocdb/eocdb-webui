import * as React from 'react';
//import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';

//import Button from '@material-ui/core/Button';
import Dashboard from "./components/Dashboard";

//import logo from './logo.svg';

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
