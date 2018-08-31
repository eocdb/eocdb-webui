import * as React from "react";

interface AppIngestionProps {
    id: string;
}


export class AppIngestion extends React.PureComponent<AppIngestionProps>{
    constructor(props: AppIngestionProps){
        super(props);
    }

    render(){
        return(
            <div>
                Hello
            </div>
        );
    }
}