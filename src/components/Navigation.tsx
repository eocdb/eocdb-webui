import * as React from "react";

import {
    Button,
    Classes,
    Tabs,
    Tab,
    TabId,
    Popover,
    Menu,
    MenuItem,
    MenuDivider,
    Position
} from "@blueprintjs/core";
import { AppHome } from "./AppHome";



interface NavigationProps {

}


interface NavigationState  {
    navbarTabId: TabId;
};

export class Navigation extends React.PureComponent<NavigationProps, NavigationState>{
    constructor(props: NavigationProps){
        super(props);

        this.state = {navbarTabId: "home"};
    }

    private handleNavbarTabChange = (navbarTabId: TabId) => this.setState({ navbarTabId });

    render(){
        return(
            <Tabs
                renderActiveTabPanelOnly={true}
                onChange={this.handleNavbarTabChange}
                selectedTabId={this.state.navbarTabId}
            >
                <Popover content={
                    <Menu>
                        <MenuDivider />
                        <MenuItem text={"test"}/>
                    </Menu>
                } position={Position.BOTTOM_RIGHT}>
                    <Button className={Classes.MINIMAL} icon="list" text="Menu" />
                </Popover>
                <Tab
                    id="home"
                    panel={<AppHome />}
                    title={<Button className={Classes.MINIMAL}
                                   icon="home"
                                   text="Home" />}
                />
                <Tab id="ingest" title={<Button className={Classes.MINIMAL} icon="add" text="Ingest" />} />
                <Tab id="lists" title={<Button className={Classes.MINIMAL} icon="document" text="Lists" />} />
                <Tab id="help" title={<Button className={Classes.MINIMAL} icon="help" text="Help" />} />
                <Tabs.Expander />
                <Tab id="login" title={<Button className={Classes.MINIMAL} icon="user" text="Login" />} />
            </Tabs>

        );
    }
}