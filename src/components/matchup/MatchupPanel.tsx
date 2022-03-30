import * as React from 'react';

import { MatchupFiles } from "../../model/MatchupFiles";
import TermsDialog from "../search/TermsDialog";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";
import MessageDialog from "./MessageDialog";


interface MatchupPanelProps {
    show: boolean;
    matchupFiles: MatchupFiles[];

    termsDialogOpen: boolean;
    openTermsDialog: () => void;
    closeTermsDialog: () => void;

    messageDialogOpen: boolean;
    openMessageDialog: () => void;
    closeMessageDialog: () => void;

    updateSelectedRowData: (rowData: string[]) => void;
    selectedRowData: string[];
}


export default function MatchupPanel(props: MatchupPanelProps) {
    const handleRowClick = (params: any) => {
        props.updateSelectedRowData([params.row.filename, params.row.dirname]);
        props.openTermsDialog();
    };

    const handleTermsDialogAgreeClick = () => {
        props.closeTermsDialog();
        props.openMessageDialog();
    };

    const handleTermsDialogDisAgreeClick = () => {
        props.closeTermsDialog();
    };


    if (!props.show) {
        return null;
    }

    let ct = 0;
    const rows = props.matchupFiles.map((item: MatchupFiles) => {
        ct++;
        return {
            id: ct,
            filename: item.filename,
            dirname: item.dirname,
            actions: ''}
    });

    const columns: GridColDef[] = [
        {
            field: 'filename',
            headerName: 'Filename',
            width: 300
        },
        {
            field: 'dirname',
            headerName: 'Dir',
            width: 400
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            sortable: false,
            filterable: false,
            renderCell: (params => {
                return (<Button onClick={() => handleRowClick(params)}>
                    Download
                </Button>);
            })
        }]

    return (
        <div style={{ height: 600, width: '100%' }}>
            <TermsDialog
                title={'OLCI in-situ Matchup Database Download Terms and Conditions'}
                open={props.termsDialogOpen}
                onDisagree={handleTermsDialogDisAgreeClick}
                onAgree={handleTermsDialogAgreeClick}
                downloadTerms={'OM'}
            />
            <MessageDialog open={props.messageDialogOpen}
                           title={"Download Matchup Files"}
                           msg={'To Download the matchup file please use an FTP client using the URL:\n\n' +
                               'ftp://ftp.eumetsat.int' + props.selectedRowData[1] + '/' + props.selectedRowData[0]}
                           onClose={props.closeMessageDialog}
            />
            <Paper sx={{'height': 700}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    pagination
                    components={{ Toolbar: GridToolbar }}
                />
            </Paper>
        </div>
    );
}

