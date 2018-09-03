import * as React from "react";
import { Button } from "@blueprintjs/core";

class MapSelectProps {
    id: string;
}


export class MapSelect extends React.PureComponent<MapSelectProps> {
    constructor(props: MapSelectProps) {
        super(props);
    }

    render() {
        return (
            <Button>
                tt
            </Button>
        );
    }

}