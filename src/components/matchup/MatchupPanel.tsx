import * as React from 'react';

import { MatchupFiles } from "../../model/MatchupFiles";
import TermsDialog from "../search/TermsDialog";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";


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
    const handleRowClick = (params: any) => {
        props.updateSelectedRowData([params.row.filename, params.row.dirname]);
        props.openTermsDialog();
    };

    const handleTermsDialogAgreeClick = () => {
        handleDownload(props.selectedRowData, {dataIndex: 0, rowIndex: 0});
        props.closeTermsDialog();
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
           field: 'id',
           headerName: 'ID',
        },
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
            width: 100,
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
            <Paper>
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

