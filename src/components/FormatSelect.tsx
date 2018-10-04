import * as React from "react";

import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { IFormat, FORMATS, renderFormat } from "./FormatSelectItems";

const FormatSelectCore = Select.ofType<IFormat>();

interface FormatSelectProps {
    id: string;
}

interface FormatSelectState {
    format: IFormat;
}


export class FormatSelect extends React.PureComponent<FormatSelectProps, FormatSelectState> {
    constructor(props: FormatSelectProps) {
        super(props);
    }

    public state: FormatSelectState = {
        format: FORMATS[0],
    };

    public render() {
        return (
            <FormatSelectCore
                items={FORMATS}
                filterable={false}
                disabled={false}
                itemRenderer={renderFormat}
                onItemSelect={this.handleValueChange}
            >
                <Button
                    text={this.state.format ? `${this.state.format.title} ` : "(No selection)"}
                    disabled={false}
                />
            </FormatSelectCore>
        );
    }

    private handleValueChange = (format: IFormat) => this.setState({format});
}