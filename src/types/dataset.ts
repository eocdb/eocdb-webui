/**
 * Dataset reference.
 */

export type DatasetStatus = "OK" | "WARNING" | "ERROR";
export type DatasetIssueType = "WARNING" | "ERROR";


export type DatasetMetaData = Map<string, string>;

export interface SearchHistoryItem {
    key: string;
    query: string;
}




export interface SearchHistoryItem{
    name: string;
    searchPath: string;
}
