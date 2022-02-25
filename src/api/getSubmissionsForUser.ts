import { callJsonApi, QueryComponent } from './callApi';
import { SubmissionQuery, SubmissionResult } from "../model/Submission";


function _sanitize_param(value: string) {
    return value.replace('"', '')
}

export function collectComponents(query?: SubmissionQuery) {
    const queryComponents: QueryComponent[] = [];
    if (!query) {
        return queryComponents;
    }
    if (query.user_id) {
        queryComponents.push(['user-id', JSON.stringify(query.user_id)]);
    }
    if (query.offset || query.offset === 0) {
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

        queryComponents.push(['query-column', column]);
        queryComponents.push(['query-value', value]);
    }

    if (query.sortModel) {
        const {sortModel} = query;
        const sortColumn = sortModel[0].field;
        const sortOrder = sortModel[0].sort;

        queryComponents.push(['sort-column', sortColumn]);
        queryComponents.push(['sort-order', sortOrder]);
    }

    return queryComponents;
}


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param query: query/filter for Submissions
 */
export function getSubmissionsForUser(apiServerUrl: string, query?: SubmissionQuery): Promise<SubmissionResult> {
    const queryComponents = collectComponents(query);
    const path = '/store/upload/user';

    return callJsonApi<SubmissionResult>(
        apiServerUrl + path, queryComponents,
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
