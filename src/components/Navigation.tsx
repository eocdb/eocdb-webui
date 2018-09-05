import * as React from "react";

import {
    Button,
    Classes,
    Alignment,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Popover,
    Position,
    Menu,
    MenuDivider,
    MenuItem
} from "@blueprintjs/core";

import logo from './EUMETSAT.png';


interface NavigationProps {
    handleNavigationClick: (event: React.MouseEvent<HTMLElement>, navTarget: string) => void;
}


interface NavigationState {
}


class Navigation extends React.PureComponent<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
    }

    render() {
        return (
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>
                        <Popover content={
                            <Menu className={Classes.ELEVATION_1}>
                                <MenuItem icon="settings" text="Settings"
                                          onClick={(event: React.MouseEvent<HTMLElement>) => this.props.handleNavigationClick(event, "settings")}
                                />
                                <MenuDivider/>
                                <MenuItem icon="download" text="Test" onClick={
                                    (event: React.MouseEvent<HTMLElement>) => this.props.handleNavigationClick(event, "test")
                                }
                                />
                                <MenuDivider/>
                            </Menu>
                        }
                                 position={Position.BOTTOM_RIGHT}>
                            <Button icon="menu" text=""/>
                        </Popover>
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
                    <img src={logo} className="App-logo" alt="logo" />
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default Navigation;