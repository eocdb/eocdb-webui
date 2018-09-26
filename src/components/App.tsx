import * as React from 'react';

import { MeasurementData, Rectangle } from "../types";
import './App.css';

import { AppSearch } from "./AppSearch";
import { AppHome } from "./AppHome";
import { AppList } from "./AppList";
import { AppHelp } from "./AppHelp";
import { AppIngestion } from "./AppIngestion";
import Navigation from "./Navigation";
import { AppSettings } from "./AppSettings";


export interface AppStateProps {
    queryString: string;
    data?: MeasurementData;
    start?: number;
    offset?: number;
    rectangle: Rectangle;
}


export interface AppDispatchProps {
    onQueryMeasurements: (queryString: string) => any;
    onPageChange: (start: number, offset: number) => any;
    onRegionChange: (rectangle: Rectangle) => void;
}


export interface AppOwnProps {
    //id: string;
}


export interface AppState {
    navTarget: string;
}


export type AppProps = AppStateProps & AppDispatchProps & AppOwnProps;


export class App extends React.PureComponent<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {navTarget: "home"};
    }

    handleQueryStringChange = (queryString: string) => {
        this.props.onQueryMeasurements(queryString);
    };

    handleRegionSelectChange = (rectangle: Rectangle) => {
        console.log(rectangle);
        this.props.onRegionChange(rectangle);
    };

    handlePageChange = (start: number, offset: number) => {
        console.log(start + '/' + offset);
        this.props.onPageChange(start, offset);
    };

    handleNavigationClick = (event: React.MouseEvent<HTMLElement>, navTarget: string) => {
        this.setState({navTarget});
    };

    public render() {
        let panel: JSX.Element = <AppHome id={"home"}/>;

        if (this.state.navTarget === "search") {
            panel = <AppSearch id={"app-search"}
                               queryString={this.props.queryString}
                               data={this.props.data}
                               onQueryStringChange={this.handleQueryStringChange}
                               onPageChange={this.handlePageChange}
                               onRegionChange={this.handleRegionSelectChange}
            />;
        }
        else if (this.state.navTarget === "lists") {
            panel = <AppList id={"lists"}/>
        }
        else if (this.state.navTarget === "ingest") {
            panel = <AppIngestion id={"ingest"}/>
        }
        else if (this.state.navTarget === "help") {
            panel = <AppHelp id={"help"}/>
        }
        else if (this.state.navTarget === "settings") {
            panel = <AppSettings id={"settings"}/>
        }

        return (
            <div className="App">
                <header className="App-header">
                    <Navigation handleNavigationClick={this.handleNavigationClick}/>
                </header>

                <div className="App-main">
                    {panel}
                </div>
            </div>
        );
    }
}

export default App;
