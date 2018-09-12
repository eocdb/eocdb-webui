import * as React from "react";


interface AppHomeProps {
    id: string;
}


export class AppHome extends React.PureComponent<AppHomeProps> {
    constructor(props: AppHomeProps) {
        super(props);
    }

    render() {
        return (
            <div>
                Home
            </div>
        );
    }
}