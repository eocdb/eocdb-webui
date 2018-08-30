import * as React from "react";

import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Popover,
    Menu,
    MenuItem,
    MenuDivider,
    Position
} from "@blueprintjs/core";



interface NavigationProps {
    numRows: number;
}


export class Navigation extends React.PureComponent<NavigationProps>{
    constructor(props: NavigationProps){
        super(props);
    }

    render(){
        return(
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>Blueprint</NavbarHeading>
                    <Popover content={
                        <Menu>
                            <MenuDivider />
                            <MenuItem text={"test"}/>
                        </Menu>
                    } position={Position.BOTTOM_RIGHT}>
                        <Button className={Classes.MINIMAL} icon="list" text="Menu" />
                    </Popover>
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon="home" text="Home" />
                    <Button className={Classes.MINIMAL} icon="search" text="Search" />
                    <Button className={Classes.MINIMAL} icon="document" text="Lists" />
                    <Button className={Classes.MINIMAL} icon="add" text="Ingestion" />
                    <Button className={Classes.MINIMAL} icon="help" text="Help" />

                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon="user" text="Login" />
                </NavbarGroup>
            </Navbar>

        );
    }
}