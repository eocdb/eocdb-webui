import * as React from 'react';

import { MatchupFiles } from "../../model/MatchupFiles";
import TermsDialog from "../search/TermsDialog";
// import MUIDataTable from "mui-datatables";


const columns = ["FileName", "Directory"];


interface MatchupPanelProps {
    show: boolean;
    matchupFiles: MatchupFiles[];

    termsDialogOpen: boolean;
    openTermsDialog: () => void;
    closeTermsDialog: () => void;

    updateSelectedRowData: (rowData: string[]) => void;
    selectedRowData: string[];
}

export default function MatchupPanel(props: MatchupPanelProps) {
    // noinspection JSUnusedLocalSymbols
    const handleDownload = (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
        window.open('ftp://ftp.eumetsat.int' + rowData[1] + '/' + rowData[0]);
    };

    // noinspection JSUnusedLocalSymbols
    const handleRowClick = (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
        props.updateSelectedRowData(rowData);
        props.openTermsDialog();
    };

    const handleTermsDialogAgreeClick = () => {
        handleDownload(this.props.selectedRowData, {dataIndex: 0, rowIndex: 0});
        props.closeTermsDialog();
    };

    const handleTermsDialogDisAgreeClick = () => {
        props.closeTermsDialog();
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
    if (!props.show) {
        return null;
    }

    const options = {
        filterType: 'textField' as any,
        onRowClick: handleRowClick,
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
                {/*<MUIDataTable*/}
                {/*    title={"Matchup Files"}*/}
                {/*    data={data}*/}
                {/*    columns={columns}*/}
                {/*    options={options}*/}
                {/*/>*/}
            </div>
        );
}

