/**
 * Dataset reference.
 */
import { DatasetQuery } from "../model";

export type DatasetStatus = "OK" | "WARNING" | "ERROR";
export type DatasetIssueType = "WARNING" | "ERROR";


export type DatasetMetaData = Map<string, string>;

export interface SearchHistoryItem {
    key: string;
    query: DatasetQuery;
}
