import { DatasetIssue } from "./DatasetIssue";

export interface DatasetValidationResult {
    status: string;
    issues: DatasetIssue [];
}
