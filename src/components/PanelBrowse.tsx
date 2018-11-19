import * as React from "react";

interface PanelBrowseProps{
    classes: any;
}


class PanelBrowse extends React.PureComponent<PanelBrowseProps> {
    constructor(props: PanelBrowseProps){
        super(props);
    }

    render(){
        return('BROWSE');
    }
}


export default PanelBrowse;