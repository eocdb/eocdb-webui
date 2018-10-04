import * as React from "react";
import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";
import * as Classes from "@blueprintjs/core/lib/esm/common/classes";


interface PopoverSettingProps {
    handleNavigationClick: (event: React.MouseEvent<HTMLElement>, navTarget: string) => void;
}


class PopoverSetting extends React.PureComponent<PopoverSettingProps>{
    render(){
      return(
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
      );
    };
}

export default PopoverSetting;