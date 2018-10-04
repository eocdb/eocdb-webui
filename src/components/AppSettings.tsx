import * as React from "react";

interface AppSettingsProps {
    id: string;
}


export class AppSettings extends React.PureComponent<AppSettingsProps>{
    constructor(props: AppSettingsProps){
        super(props);
    }

    render(){
        return(
            <div>
                Settings
            </div>
        );
    }
}