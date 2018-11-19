import * as React from "react";

interface PanelSubmitProps{
    classes: any;
}


class PanelSubmit extends React.PureComponent<PanelSubmitProps> {
    constructor(props: PanelSubmitProps){
        super(props);
    }

    render(){
        return('HOME');
    }
}


export default PanelSubmit;