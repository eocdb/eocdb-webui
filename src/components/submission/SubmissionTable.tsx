import * as React from "react";
import { Submission, User } from "../../model";
import { Button, Chip, Icon, Paper, Stack, styled, Tooltip } from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridSortModel,
    GridToolbar,
} from '@mui/x-data-grid';
import { CloudUpload } from "@mui/icons-material";
import { SubmissionQuery, SubmissionResult } from "../../model/Submission";
import { OpenNewCalibrationDialogButton } from "./CalibrationSubmissionComponents";


const Item = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


interface SubmissionTableProps {
    show: boolean;

    onSubmissionDialogOpen: () => void;

    onSubmissionDialogMetaOpen: (submissionId: string) => void;

    onSubmissionSelect: (selectedSubmissionId: string) => void;

    onSubmissionApprove: (selectedSubmissionId: string) => void;
    onSubmissionProcess: (selectedSubmissionId: string) => void;
    onSubmissionReject: (selectedSubmissionId: string) => void;
    onSubmissionHalt: (selectedSubmissionId: string) => void;
    onSubmissionRestart: (selectedSubmission: Submission) => void;
    onSubmissionSubmit: (selectedSubmissionId: string) => void;
    onSubmissionUpdate: (selectedSubmissionId: string) => void;
    onSubmissionDelete: (selectedSubmissionId: string) => void;

    onSubmissionReady: (selectedSubmissionId: string) => void;
    onSubmissionPublish: (selectedSubmissionId: string) => void;

    submissionQuery: SubmissionQuery;
    updateSubmissionQuery: (submissionQuery: SubmissionQuery) => void;

    submissionResult: SubmissionResult;
    updateSubmissionsForUser: () => void;

    user: User | null;
}


export default function SubmissionTable(props: SubmissionTableProps) {
    const makeActionRow = (params, isAdmin, isSubmitter) => {
        return (
            <div>
                <Tooltip title="Update Submission" placement={"top"}>
                    <span>
                        <Button
                            onClick={() => props.onSubmissionDialogMetaOpen(
                                params.row.submission_id
                            )}
                            disabled={!isAdmin && !isSubmitter}
                        >
                            <Icon>edit</Icon>
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="List Files" placement={"top"}>
                    <Button
                        onClick={() => props.onSubmissionSelect(
                            params.row.submission_id
                        )}
                    >
                        <Icon>list</Icon>
                    </Button>
                </Tooltip>
                {params.row.status === 'PAUSED' || params.row.status === 'CANCELED' ?
                    <Tooltip title="Restart Submission" placement={"top"}>
                        <Button
                            onClick={() => props.onSubmissionRestart(
                                {...params.row, submission_id: params.row.submission_id}
                            )}
                        >
                            <Icon>play_arrow</Icon>

                        </Button>
                    </Tooltip>
                    :
                    <Tooltip title="Pause Submission" placement={"top"}>
                        <Button
                            onClick={() => props.onSubmissionHalt(
                                params.row.submission_id
                            )}
                        >
                            <Icon>pause</Icon>
                        </Button>
                    </Tooltip>
                }
                <Tooltip title="Delete Entire Submission" placement={"top"}>
                    <span>
                        <Button
                            onClick={() => props.onSubmissionDelete(
                                params.row.submission_id
                            )}
                            // disabled={!isSubmitter}
                        >
                            <Icon>delete</Icon>
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Cancel Submission" placement={"top"}>
                    <span>
                        <Button
                            onClick={() => props.onSubmissionReject(
                                params.row.submission_id
                            )}
                            disabled={!isAdmin}
                        >
                            <Icon>power_settings_new</Icon>
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Process Submission into DB" aria-label="ProcessSubmission">
                    <span>
                        <Button
                            onClick={() => props.onSubmissionProcess(
                                params.row.submission_id
                            )}
                            disabled={!isAdmin}
                        >
                            <Icon>input</Icon>
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Process into database and Publish Submission"
                         placement={"top"}>
                    <span>
                        <Button
                            onClick={() => props.onSubmissionPublish(
                                params.row.submission_id
                            )}
                            disabled={!isAdmin}
                        >
                            <Icon>publish</Icon>
                        </Button>
                    </span>
                </Tooltip>
            </div>
        );
    }

    const getColourForStatus = (status: string) => {
        switch (status) {
            case 'SUBMITTED':
                return red.A700;
            case 'VALIDATED':
                return green["200"];
            case 'PROCESSED':
                return green["400"];
            case 'PUBLISHED':
                return green["800"];
            case 'CANCELED':
                return orange["300"];
            case 'PAUSED':
                return orange["800"];
            case 'APPROVED':
                return blue.A100;
            case 'READY':
                return blue.A400;
        }
        return "yellow"
    };

    const makeRows = (submissions: Submission[]) => {
        return submissions.map((submission: Submission) => {
            return {
                submission_id: submission.submission_id,
                date: submission.date,
                user_id: submission.user_id,
                publication_date: submission.publication_date,
                allow_publication: submission.allow_publication,
                status: submission.status,
                actions: '.'
            }
        });
    };

    if (!props.show) {
        return null;
    }
    const {submissionResult} = props;
    const rows = makeRows(submissionResult.submissions)

    const user = props.user === null ? undefined : props.user;

    const isAdmin = user && (user.roles.indexOf('admin') > -1);
    const isSubmitter = user && (user.roles.indexOf('submit') > -1);

    const columns: GridColDef[] = [
        {
            field: 'submission_id',
            headerName: 'Submission ID',
            width: 260
        },
        {
            field: 'user_id',
            headerName: 'Submitter',
            width: 150,
        },
        {
            field: 'date',
            headerName: 'Submission Date',
            type: 'dateTime',
            width: 170,
        },
        {
            field: 'publication_date',
            headerName: 'Publication Date',
            type: 'dateTime',
            width: 160,
            sortable: false
        },
        {
            field: 'allow_publication',
            headerName: 'Publication Allowed',
            type: 'boolean',
            width: 160,
            editable: true
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 160,
            editable: true,
            renderCell: (params => {
                const colour = getColourForStatus(params.row.status);
                return (<Chip
                    label={params.row.status}
                    style={{background: colour, color: "white"}}
                />);
            })
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 700,
            renderCell: (params => {
                return makeActionRow(params, isAdmin, isSubmitter);
            })
        }
    ];

    const handleFilterChange = (filterModel: GridFilterModel) => {
        const currentFilterModel = props.submissionQuery.filterModel;

        let isClearEvent: boolean;
        if (currentFilterModel && filterModel) {
            if (filterModel.items.length == 0) {
                isClearEvent = true;
            } else {
                let currItem = currentFilterModel.items[0];
                let newItem = filterModel.items[0];
                isClearEvent = currItem.operatorValue === newItem.operatorValue
                    && currItem.columnField === newItem.columnField
                    && filterModel.items[0].value === undefined;
            }
        } else {
            isClearEvent = false;
        }

        if (isClearEvent) {
            filterModel.items[0].operatorValue = 'contains';
            filterModel.items[0].columnField = 'submission_id';
        }

        const submissionQuery: SubmissionQuery =
            {
                ...props.submissionQuery,
                user_id: (user) ? user.name : undefined,
                loading: true,
                filterModel: filterModel,
                page: 0,
                offset: 0
            };

        props.updateSubmissionQuery(submissionQuery);
        props.updateSubmissionsForUser();
    };

    const handleSortModelChange = (newModel: GridSortModel) => {
        const submissionQuery: SubmissionQuery = {
            ...props.submissionQuery,
            loading: true,
            sortModel: newModel,
            page: 0
        };

        props.updateSubmissionQuery(submissionQuery);
        props.updateSubmissionsForUser();
    };

    let pageSize = 10;

    const handlePageChange = (newPage) => {
        const submissionQuery: SubmissionQuery = {
            ...props.submissionQuery,
            loading: true,
            offset: (newPage * pageSize),
            count: pageSize,
            page: newPage,
        };

        props.updateSubmissionQuery(submissionQuery);
        props.updateSubmissionsForUser();
    };

    return (
        <Paper sx={{'height': 700}}>
            <Stack direction={"row"} justifyContent={"start"}>
                <Item>
                    <Button variant="contained"
                            color="secondary"
                            onClick={props.onSubmissionDialogOpen}
                    >
                        New Submission &nbsp;
                        <CloudUpload/>
                    </Button>
                </Item>
                <Item>
                    <OpenNewCalibrationDialogButton/>
                </Item>
            </Stack>
            <DataGrid
                rows={rows}
                // A unique field with name 'id' is required by MUI-X DataGrid. If such a field
                // does not exist in a row, the function getRowId must be implemented.
                getRowId={(row) => row.submission_id}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[pageSize]}
                rowCount={submissionResult.tot_count}
                paginationMode={"server"}
                pagination
                page={props.submissionQuery.page}
                loading={props.submissionQuery.loading}
                onPageChange={handlePageChange}
                // disableSelectionOnClick
                components={{Toolbar: GridToolbar}}
                filterMode="server"
                filterModel={props.submissionQuery.filterModel}
                onFilterModelChange={handleFilterChange}
                sortingMode="server"
                sortModel={props.submissionQuery.sortModel}
                onSortModelChange={handleSortModelChange}
                sx={{backgroundColor: "white"}}
            />
        </Paper>
    );
}
