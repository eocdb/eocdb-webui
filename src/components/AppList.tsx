import * as React from "react";

interface AppListProps {
    id: string;
}


export class AppList extends React.PureComponent<AppListProps>{
    constructor(props: AppListProps){
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