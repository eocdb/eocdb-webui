import { SubmissionFile } from "./SubmissionFile";

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
