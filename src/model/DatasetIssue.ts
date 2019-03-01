import { DatasetIssueType } from "../types/dataset";

export interface DatasetIssue {
    type: DatasetIssueType;
    description: string;
}
