import * as React from "react";
import { FileInput } from "@blueprintjs/core";


interface AppIngestionProps {
    id: string;
}


export class AppIngestion extends React.PureComponent<AppIngestionProps> {
    constructor(props: AppIngestionProps) {
        super(props);
    }

    handleInputChange = () => {

    };

    render() {
        return (
            <div>
                <FileInput disabled={false} text="Choose file..." onInputChange={this.handleInputChange}/>
            </div>
        );
    }
}

export default AppIngestion;