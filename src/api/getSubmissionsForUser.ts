import { callJsonApi, QueryComponent } from './callApi';
import { SubmissionQuery, SubmissionResult } from "../model/Submission";


export function collectComponents(query?: SubmissionQuery) {
    const queryComponents: QueryComponent[] = [];
    if (!query) {
        return queryComponents;
    }
    if (query.user_id) {
        queryComponents.push(['user-id', query.user_id]);
    }
    if (query.offset || query.offset === 0) {
        queryComponents.push(['offset', JSON.stringify(query.offset)]);
    }
    if (query.count) {
        queryComponents.push(['count', JSON.stringify(query.count)]);
    }

    if (query.filterModel) {
        const {filterModel} = query;
        const operator = filterModel.items[0].operatorValue;
        const value = (filterModel.items[0].value) ? filterModel.items[0].value : '';
        let column = filterModel.items[0].columnField;

        queryComponents.push(['query-column', column]);
        queryComponents.push(['query-operator', operator]);
        queryComponents.push(['query-value', value]);
    }

    if (query.sortModel && query.sortModel[0]) {
        const {sortModel} = query;
        let fieldName = sortModel[0].field;
        const sortColumn = fieldName;
        const sortOrder = sortModel[0].sort;

        queryComponents.push(['sort-column', sortColumn]);
        queryComponents.push(['sort-order', sortOrder]);
    }

    return queryComponents;
}


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param user_name: User name of logged in user
 * @param query: query/filter for Submissions
 */
export function getSubmissionsForUser(apiServerUrl: string, user_name: string, query?: SubmissionQuery): Promise<SubmissionResult> {
    const queryComponents = collectComponents(query);
    const path = '/store/upload/user/' + user_name;

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
