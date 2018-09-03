import * as React from "react";

interface AppHelpProps {
    id: string;
}


export class AppHelp extends React.PureComponent<AppHelpProps>{
    constructor(props: AppHelpProps){
        super(props);
    }

    render(){
        return(
            <div>
                Help
            </div>
        );
    }
}