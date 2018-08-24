import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { SearchField } from "./SearchField";
import { DataTable } from "./DataTable";

interface AppProps {
    queryString: string;
    data?: string[][];
    onQueryMeasurements: (queryString: string) => void;
}

class App extends React.PureComponent<AppProps> {

    handleQueryStringChange = (queryString: string) => {
        this.props.onQueryMeasurements(queryString);
    };

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <div className="App-main">
                    <SearchField queryString={this.props.queryString}
                                 onQueryStringChange={this.handleQueryStringChange}/>
                    <br/>
                    <br/>
                    <DataTable numRows={100} data={this.props.data}/>
                </div>
            </div>
        );
    }
}

export default App;
