import * as React from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import { FormEvent } from "react";


/* TODO
Handle focus event
 */


interface SearchFieldProps {
    queryString: string;
    onQueryStringChange: (queryString: string) => void;
    onSearchSuccess: (success: boolean) => void;
}


interface SearchFieldState {
    queryString: string;
}


export class SearchField extends React.PureComponent<SearchFieldProps, SearchFieldState> {

    constructor(props: SearchFieldProps) {
        super(props);
        this.state = {queryString: props.queryString};
    }

    handleClick = () => {
        this.props.onQueryStringChange(this.state.queryString);
        this.props.onSearchSuccess(true);
    }

    handleOnKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.keyCode === 13) {
            this.props.onQueryStringChange(this.state.queryString);
            this.props.onSearchSuccess(true);
        }
    };

    handleChange = (event: FormEvent<HTMLInputElement>) => {
        this.setState({
            queryString: (event.target as HTMLInputElement).value
        });
    };

    render() {
        return (
            <div>
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
                <br/>
                <br/>
            </div>
        );
    }
}