import * as React from "react";

interface AppListProps {
    id: string;
}

interface AppListState {
    report: string;
}


export class AppList extends React.PureComponent<AppListProps, AppListState> {
    constructor(props: AppListProps) {
        super(props);

        this.state = {
            report: 'Scientist',
        };
    }

    render() {
        return (
            <div>
                List: {this.state.report}
            </div>
        );
    }
}