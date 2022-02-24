import * as React from "react";
import { User, Submission } from "../../model";
import {
    Tooltip,
    Button,
    Icon, Chip
} from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { DataGrid, GridColDef, GridFilterModel, GridSortModel, GridToolbar } from '@mui/x-data-grid';
import { CloudUpload } from "@mui/icons-material";
import { SERVER_CONFIG } from "../../api/config";
import { getSubmissionsForUser } from "../../api";
import { SubmissionQuery } from "../../model/Submission";



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
                                params.row.id
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
                            params.row.id
                        )}
                    >
                        <Icon>list</Icon>
                    </Button>
                </Tooltip>
                {params.row.status === 'PAUSED' || params.row.status === 'CANCELED' ?
                    <Tooltip title="Restart Submission" placement={"top"}>
                        <Button
                            onClick={() => props.onSubmissionRestart(
                                params.row.id
                            )}
                        >
                            <Icon>play_arrow</Icon>

                        </Button>
                    </Tooltip>
                :
                    <Tooltip title="Pause Submission" placement={"top"}>
                        <Button
                            onClick={() => props.onSubmissionHalt(
                                params.row.id
                            )}
                        >
                            <Icon>pause</Icon>
                        </Button>
                    </Tooltip>
                }
                <Tooltip title="Cancel Submission" placement={"top"}>
                    <span>
                        <Button
                            onClick={() => props.onSubmissionReject(
                                params.row.id
                            )}
                            disabled={!isAdmin}
                        >
                            <Icon>power_settings_new</Icon>
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Delete Entire Submission" placement={"top"}>
                    <span>
                        <Button
                            onClick={() => props.onSubmissionDelete(
                                params.row.id
                            )}
                            disabled={!isAdmin}
                        >
                            <Icon>delete</Icon>
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Process Submission into DB" aria-label="ProcessSubmission">
                    <span>
                        <Button
                            onClick={() => props.onSubmissionProcess(
                                params.row.id
                            )}
                            disabled={!isAdmin}
                        >
                            <Icon>input</Icon>
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Process into DB and Publish Submission"
                         placement={"top"}>
                    <span>
                        <Button
                            onClick={() => props.onSubmissionPublish(
                                params.row.id
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
                return blue.A100;
            case 'VALIDATED':
                return green.A100;
            case 'APPROVED':
                return green.A400;
            case 'READY':
                return red.A200;
            case 'CANCELED':
                return orange.A400;
            case 'PAUSED':
                return orange.A100;
            case 'PUBLISHED':
                return red.A400;
            case 'PROCESSED':
                return red.A100;
        }
        return "yellow"
    };

    const makeRows = (submissions: Submission[]) => {
        return submissions.map((submission: Submission) => {
            return {
                id: submission.submission_id,
                submission_date: submission.date,
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
    // const rows = makeRows(submissionsValue);
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [totRows, setTotRows] = React.useState(0);
    const [filterModel, setFilterModel] = React.useState<GridFilterModel | undefined>();
    const [loading, setLoading] = React.useState(false);
    const [sortModel, setSortModel] = React.useState<GridSortModel>([
        { field: 'rating', sort: 'asc' },
    ]);

    React.useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            const submissionQuery: SubmissionQuery =
                {
                    user_id: (user) ? user.name : undefined,
                    offset: (page * 5) + 1,
                    count: 10,
                    filterModel: filterModel,
                    sortModel: sortModel,
                };

            const submissionResult = await getSubmissionsForUser(SERVER_CONFIG, submissionQuery);

            const newRows = makeRows(submissionResult.submissions);

            if (!active) {
                return;
            }

            setRows(newRows);
            setTotRows(submissionResult.tot_count);
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [page, filterModel, sortModel]);

    const user = props.user === null ? undefined : props.user;

    const isAdmin = user && (user.roles.indexOf('admin') > -1);
    const isSubmitter = user && (user.roles.indexOf('submit') > -1);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Submission ID',
            width: 160
        },
        {
            field: 'user_id',
            headerName: 'Submitter',
            width: 150,
            editable: true
        },
        {
            field: 'submission_date',
            headerName: 'Submission Date',
            width: 150,
            editable: true
        },
        {
            field: 'publication_date',
            headerName: 'Publication Date',
            type: 'date',
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
            width: 400,
            renderCell: (params => {
                return makeActionRow(params, isAdmin, isSubmitter);
            })
        }
    ];

    const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
        setFilterModel(filterModel.items[0].value);
    }, []);


    return (
        <div style={{ height: 700, width: '100%' }}>
            <Button variant="contained"
                    color="secondary"
                    onClick={props.onSubmissionDialogOpen}
            >
                New Submission
                <CloudUpload/>
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                rowCount={totRows}
                paginationMode={"server"}
                // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                // rowsPerPageOptions={[5, 10]}
                pagination
                loading={loading}
                onPageChange={(newPage) => setPage(newPage)}
                // disableSelectionOnClick
                components={{ Toolbar: GridToolbar }}
                filterMode="server"
                onFilterModelChange={onFilterChange}
                // Sort change
                sortingMode="server"
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
            />
        </div>
    );
}
