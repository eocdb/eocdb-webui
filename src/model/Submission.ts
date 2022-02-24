import { SubmissionFile } from "./SubmissionFile";
import { GridSortModel, GridFilterModel } from "@mui/x-data-grid";

export type SortOrder = 'asc' | 'desc';

export interface SubmissionQuery {
    loading: boolean;
    user_id?: string;
    offset?: number;
    count?: number;
    page?: number;
    sortModel?: GridSortModel;
    filterModel?: GridFilterModel;
}

export const DEFAULT_SUBMISSION_QUERY: SubmissionQuery = {
    loading: false,
    user_id: undefined,
    offset: 0,
    count: 10,
    page: 0,
    sortModel: undefined,
    filterModel: undefined,
}


export interface SubmissionResult {
    submissions: Submission[];
    tot_count: number;
}

export interface Submission {
    submission_id: string;
    user_id: number;
    date: string;
    status: string;
    path: string;
    files: SubmissionFile[];
    file_refs: SubmissionFile[];
    publication_date: string;
    allow_publication: boolean;
}
