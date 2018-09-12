import * as React from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import { FormEvent } from "react";


/* TODO
Handle enter event and focus event
 */


interface SearchFieldProps {
    queryString: string;
    onQueryStringChange: (queryString: string) => void;
}


interface SearchFieldState {
    queryString: string;
}


export class SearchField extends React.PureComponent<SearchFieldProps, SearchFieldState> {

    constructor(props: SearchFieldProps) {
        super(props);
        this.state = {queryString: props.queryString};
    }

    handleClick = () => this.props.onQueryStringChange(this.state.queryString);

    handleOnKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.keyCode === 13) {
            this.props.onQueryStringChange(this.state.queryString);
        }
    };

    handleChange = (event: FormEvent<HTMLInputElement>) => {
        this.setState({
            queryString: (event.target as HTMLInputElement).value
        });
    };

    render() {
        return (
            <InputGroup
                disabled={false}
                large={true}
                leftIcon="search"
                onChange={this.handleChange}
                onKeyDown={this.handleOnKeyDown}
                placeholder="query expression"
                rightElement={<Button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"
                                      onClick={this.handleClick}/>}
                value={this.state.queryString}
            />
        );
    }
}