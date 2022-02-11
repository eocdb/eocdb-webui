import * as React from "react";
import { User, Submission } from "../../model";
import {
    TableHead,
    TableCell,
    Tooltip,
    TableSortLabel,
    Paper,
    Grid,
    Button,
    Table,
    TableBody,
    TableRow,
    Icon, Chip
} from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { CloudUpload } from "@mui/icons-material";


function desc(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function stableSort(array: any, cmp: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
}


function getSorting(order: any, orderBy: any) {
    return order === 'desc' ? (a: any, b: any) => desc(a, b, orderBy) : (a: any, b: any) => -desc(a, b, orderBy);
}


interface EnhancedTableHeadProps {
    onRequestSort: (event: any, property: any) => void;
    order: 'asc' | 'desc';
    orderBy: string;
}


const cols = [
    {id: 'submission_id', numeric: false, disablePadding: true, label: 'Submission ID'},
    {id: 'user_id', numeric: true, disablePadding: false, label: 'Submitter'},
    {id: 'submission_date', numeric: true, disablePadding: false, label: 'Submission Date'},
    {id: 'publication_date', numeric: true, disablePadding: false, label: 'Publication Date'},
    {id: 'allow_publication', numeric: true, disablePadding: false, label: 'Allow Publication'},
    {id: 'status', numeric: true, disablePadding: false, label: 'Status'},
];


class EnhancedTableHead extends React.Component<EnhancedTableHeadProps> {
    constructor(props: EnhancedTableHeadProps) {
        super(props);

    }


    createSortHandler = (property: any) => (event: any) => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {cols.map(
                        row => (
                            <TableCell
                                key={row.id}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                    <TableCell
                        key={'action'}
                    >
                        Action
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }
}


// const styles = (theme: Theme) => createStyles(
//     {
//         root: {
//             width: '100%',
//             overflowX: 'auto',
//         },
//         table: {
//             minWidth: 700,
//         },
//         rightIcon: {},
//         fab: {
//             margin: theme.spacing.unit * 2,
//         },
//         button: {
//             margin: theme.spacing.unit / 2,
//         },
//         link: {
//             fontcolor: "black"
//         },
//     });


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

    submissionsValue: Submission[];

    user: User | null;
}


interface SubmissionTableState {
    order: 'asc' | 'desc';
    orderBy: string;
}


class SubmissionTable extends React.PureComponent<SubmissionTableProps, SubmissionTableState> {
    constructor(props: SubmissionTableProps) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'submission_id',
        };
    }

    getColourForStatus = (status: string) => {
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

    handleRequestSort = (event: any, property: any) => {
        const orderBy = property;
        let order: 'asc' | 'desc' = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {order, orderBy} = this.state;
        const {submissionsValue} = this.props;

        const user = this.props.user === null ? undefined : this.props.user;

        const isAdmin = user && (user.roles.indexOf('admin') > -1);
        const isSubmitter = user && (user.roles.indexOf('submit') > -1);

        return (
            <div>
                <Paper>
                    <Grid container>
                        <Button variant="contained"
                                color="secondary"
                                // className={classes.button}
                                onClick={this.props.onSubmissionDialogOpen}
                        >
                            New Submission
                            <CloudUpload/>
                        </Button>
                    </Grid>
                    <Table>
                        <EnhancedTableHead onRequestSort={this.handleRequestSort} order={order} orderBy={orderBy}/>
                        <TableBody>
                            {stableSort(submissionsValue, getSorting(order, orderBy)).map((row: Submission) => {
                                const colour = this.getColourForStatus(row.status);
                                console.log(row);

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        key={row.submission_id}
                                        tabIndex={-1}
                                    >
                                        <TableCell component="th" scope="row" padding="none">
                                            {row.submission_id}
                                        </TableCell>
                                        <TableCell>
                                            {row.user_id ? row.user_id : ""}
                                        </TableCell>
                                        <TableCell>
                                            {row.date ?
                                                new Date(Date.parse(row.date)).toDateString() : ""}
                                        </TableCell>
                                        <TableCell>
                                            {row.publication_date ?
                                                new Date(Date.parse(row.publication_date)).toDateString() : ""}
                                        </TableCell>
                                        <TableCell>
                                            {row.allow_publication ?
                                                <Icon style={{color: green.A400}}>done</Icon> :
                                                <Icon style={{color: red.A400}}>pan_tool</Icon>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
                                                style={{background: colour, color: "white"}}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Update Submission" aria-label="updateSubmission">
                                                <span>
                                                    <Button
                                                        onClick={() => this.props.onSubmissionDialogMetaOpen(
                                                            row.submission_id
                                                        )}
                                                        disabled={!isAdmin && !isSubmitter}
                                                    >
                                                        <Icon>edit</Icon>
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="List Files" aria-label="ListFiles">
                                                <Button
                                                    onClick={() => this.props.onSubmissionSelect(
                                                        row.submission_id
                                                    )}
                                                >
                                                    <Icon>list</Icon>
                                                </Button>
                                            </Tooltip>
                                            {row.status === 'PAUSED' || row.status === 'CANCELED' ?
                                                <Tooltip title="Restart Submission" aria-label="RestartSubmission">
                                                    <Button
                                                        onClick={() => this.props.onSubmissionRestart(
                                                            row
                                                        )}
                                                    >
                                                        <Icon>play_arrow</Icon>

                                                    </Button>
                                                </Tooltip>
                                                :
                                                <Tooltip title="Pause Submission" aria-label="PauseSubmission">
                                                    <Button
                                                        onClick={() => this.props.onSubmissionHalt(
                                                            row.submission_id
                                                        )}
                                                    >
                                                        <Icon>pause</Icon>
                                                    </Button>
                                                </Tooltip>
                                            }
                                            <Tooltip title="Cancel Submission" aria-label="CancelSubmission">
                                                <span>
                                                    <Button
                                                        onClick={() => this.props.onSubmissionReject(
                                                            row.submission_id
                                                        )}
                                                        disabled={!isAdmin}
                                                    >
                                                        <Icon>power_settings_new</Icon>
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Delete Entire Submission" aria-label="deleteSubmission">
                                                <span>
                                                    <Button
                                                        onClick={() => this.props.onSubmissionDelete(
                                                            row.submission_id
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
                                                        onClick={() => this.props.onSubmissionProcess(
                                                            row.submission_id
                                                        )}
                                                        disabled={!isAdmin}
                                                    >
                                                        <Icon>input</Icon>
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Process into DB and Publish Submission"
                                                     aria-label="PublishSubmission">
                                                <span>
                                                    <Button
                                                        onClick={() => this.props.onSubmissionPublish(
                                                            row.submission_id
                                                        )}
                                                        disabled={!isAdmin}
                                                    >
                                                        <Icon>publish</Icon>
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}


export default SubmissionTable;
