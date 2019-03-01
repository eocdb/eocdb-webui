import { DatasetQuery, DatasetRef } from ".";

export interface QueryResult {
    datasets: DatasetRef[];
    query: DatasetQuery;
    total_count: number;
    locations: Map<string, string>;
}
