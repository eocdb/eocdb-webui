import * as React from 'react';
import './App.css';

//import logo from './logo.svg';
import { SearchField } from "./SearchField";
import { DataTable } from "./DataTable";
import { Navigation } from "./Navigation";
import { MeasurementData } from "../types";

interface AppProps {
    queryString: string;
    data?: MeasurementData;
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
                    <Navigation numRows={3}/>
                </header>
                <p className="App-intro">
                    OC-DB Database Search
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
