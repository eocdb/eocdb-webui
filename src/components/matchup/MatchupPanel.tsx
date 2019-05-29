import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';

import MUIDataTable, { FilterType } from "mui-datatables";
import { MatchupFiles } from "../../model/MatchupFiles";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        root: {},
        title: {
            flexGrow: 1,
        },
    });



const columns = ["FileName", "Directory"];


interface MatchupPanelProps extends WithStyles<typeof styles> {
    show: boolean;
    matchupFiles: MatchupFiles[];
}

class MatchupPanel extends React.PureComponent<MatchupPanelProps> {
    constructor(props: MatchupPanelProps) {
        super(props);
    }

    // noinspection JSUnusedLocalSymbols
    handleRowClick = (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
         console.log(rowData);
         window.open('ftp://ftp.eumetsat.int' + rowData[1] + '/' + rowData[0]);
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const options = {
            filterType: 'textField' as FilterType,
            onRowClick: this.handleRowClick
        };

        const data = this.props.matchupFiles.map((item: MatchupFiles) => {
            return [item.filename, item.dirname]
        });

        return (
            <div>
                <MUIDataTable
                    title={"Matchup Files"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        );
    }
}

export default withStyles(styles)(MatchupPanel);
