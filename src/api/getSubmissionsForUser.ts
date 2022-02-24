import { callJsonApi, QueryComponent } from './callApi';
import {Submission} from "../model";
import { SubmissionQuery } from "../model/Submission";

export function collectComponents(query?: SubmissionQuery) {
    const queryComponents: QueryComponent[] = [];
    if (!query) {
        return queryComponents;
    }
    if (query.user_id) {
        queryComponents.push(['user-id', JSON.stringify(query.user_id)]);
    }
    if (query.offset) {
        queryComponents.push(['offset', JSON.stringify(query.offset)]);
    }
    if (query.count) {
        queryComponents.push(['count', JSON.stringify(query.count)]);
    }

    if (query.filterModel) {
        const {filterModel} = query;
        const value = filterModel.items[0].value;
        let column = filterModel.items[0].columnField;
        column = column == 'id'? 'submission_id' : column;

        queryComponents.push(['query-column', JSON.stringify(column)]);
        queryComponents.push(['query-value', JSON.stringify(value)]);
    }

    if (query.sortModel) {
        const {sortModel} = query;
        const sortColumn = sortModel[0].field;
        const sortOrder = sortModel[0].sort;

        queryComponents.push(['sort-column', JSON.stringify(sortColumn)]);
        queryComponents.push(['sort-order', JSON.stringify(sortOrder)]);
    }

    return queryComponents;
}


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param query: query/filter for Submissions
 */
export function getSubmissionsForUser(apiServerUrl: string, query?: SubmissionQuery): Promise<Submission[]> {
    const queryComponents = collectComponents(query)
    return callJsonApi<Submission[]>(
        apiServerUrl + '/store/upload/user', queryComponents,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "same-origin",
        }
    );
}
