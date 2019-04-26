import { DatasetValidationResult } from "./DatasetValidationResult";

export interface SubmissionFile {
    index: number;
    submission_id: string;
    filename: string;
    status: string;
    filetype: string;
    result: DatasetValidationResult;
}
