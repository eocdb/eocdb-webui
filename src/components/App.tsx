import * as React from 'react';
import './App.css';

//import logo from './logo.svg';
import { AppSearch } from "./AppSearch";
import { Navigation } from "./Navigation";
import { MeasurementData } from "../types";


export interface AppStateProps{
    queryString: string;
    data?: MeasurementData;
}


export interface AppDispatchProps{
    onQueryMeasurements: (queryString: string) => any;
}


export interface AppOwnProps{
    //id: string;
}

interface AppState {
    navTarget: string;
}


type AppProps = AppStateProps & AppDispatchProps & AppOwnProps;


export class App extends React.PureComponent<AppProps, AppState> {

    constructor(props: AppProps){
        super(props);
        this.state = {navTarget: "home"};
    }

    handleQueryStringChange = (queryString: string) => {
        this.props.onQueryMeasurements(queryString);
    };

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Navigation />
                </header>

                <div className="App-main">
                    <AppSearch id={"app-search"}
                               queryString={this.props.queryString}
                               data={this.props.data}
                               onQueryStringChange={this.handleQueryStringChange}
                    />

                </div>
            </div>
        );
    }
}

export default App;
