import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';

import MUIDataTable from "mui-datatables";
import { MatchupFiles } from "../../model/MatchupFiles";
import TermsDialog from "../search/TermsDialog";
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";


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

    termsDialogOpen: boolean;
    openTermsDialog: () => void;
    closeTermsDialog: () => void;

    updateSelectedRowData: (rowData: string[]) => void;
    selectedRowData: string[];
}

class MatchupPanel extends React.PureComponent<MatchupPanelProps> {
    constructor(props: MatchupPanelProps) {
        super(props);
    }

    // noinspection JSUnusedLocalSymbols
    handleDownload = (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
        window.open('ftp://ftp.eumetsat.int' + rowData[1] + '/' + rowData[0]);
    };

    // noinspection JSUnusedLocalSymbols
    handleRowClick = (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
        this.props.updateSelectedRowData(rowData);
        this.props.openTermsDialog();
    };

    handleTermsDialogAgreeClick = () => {
        this.handleDownload(this.props.selectedRowData, {dataIndex: 0, rowIndex: 0});
        this.props.closeTermsDialog();
    };

    handleTermsDialogDisAgreeClick = () => {
        this.props.closeTermsDialog();
    };


    // getMuiTheme = () => createMuiTheme({
    //     overrides: {
    //         MUIDataTableBodyCell: {
    //             root: {
    //                 backgroundColor: "#FF0000",
    //                 cursor: 'pointer'
    //             }
    //         }
    //     }
    // });

    render() {
        if (!this.props.show) {
            return null;
        }

        const options = {
            filterType: 'textField' as any,
            onRowClick: this.handleRowClick,
            selectableRows: 'none' as any,
        };

        const data = this.props.matchupFiles.map((item: MatchupFiles) => {
            return [item.filename, item.dirname]
        });

        return (
            <div>
                <TermsDialog
                    title={'OLCI in-situ Matchup Database Download Terms and Conditions'}
                    open={this.props.termsDialogOpen}
                    onDisagree={this.handleTermsDialogDisAgreeClick}
                    onAgree={this.handleTermsDialogAgreeClick}
                    downloadTerms={'OM'}
                />
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
