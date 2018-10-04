import * as React from "react";

import {
    Button,
    Classes,
    Alignment,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core";

import logo from './EUMETSAT.png';
import PopoverSetting from "./PopoverSetting";


interface NavigationProps {
    handleNavigationClick: (event: React.MouseEvent<HTMLElement>, navTarget: string) => void;
}


class Navigation extends React.PureComponent<NavigationProps> {
    constructor(props: NavigationProps) {
        super(props);
    }

    render() {
        return (
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>
                        <PopoverSetting handleNavigationClick={this.props.handleNavigationClick}/>
                    </NavbarHeading>
                    <NavbarDivider/>
                    <Button className={Classes.MINIMAL} icon="home" text="Home"
                            onClick={(event: React.MouseEvent<HTMLElement>) => this.props.handleNavigationClick(event, "home")}/>
                    <Button className={Classes.MINIMAL} icon="search" text="Search"
                            onClick={(event: React.MouseEvent<HTMLElement>) => this.props.handleNavigationClick(event, "search")}/>
                    <Button className={Classes.MINIMAL} icon="document" text="Lists"
                            onClick={(event: React.MouseEvent<HTMLElement>) => this.props.handleNavigationClick(event, "lists")}/>
                    <Button className={Classes.MINIMAL} icon="plus" text="Ingestion"
                            onClick={(event: React.MouseEvent<HTMLElement>) => this.props.handleNavigationClick(event, "ingest")}/>
                    <Button className={Classes.MINIMAL} icon="help" text="Help"
                            onClick={(event: React.MouseEvent<HTMLElement>) => this.props.handleNavigationClick(event, "help")}/>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <img src={logo} className="App-logo" alt="logo"/>
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default Navigation;