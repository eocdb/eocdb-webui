import * as React from "react";

interface DashHomePanelProps{
    classes: any;
}


class DashHomePanel extends React.PureComponent<DashHomePanelProps> {
    constructor(props: DashHomePanelProps){
        super(props);
    }

    render(){
        return('HOME');
    }
}


export default DashHomePanel;