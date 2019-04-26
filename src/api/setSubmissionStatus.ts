import { callApi } from "./callApi";


export function setSubmissionStatus(apiServerUrl: string, submissionId: string, status: string, appDate?: string | null):
    Promise<Response>{

    //const result = appDate? {status: status, publication_date: appDate} : {status: status};

    const result = {status: status, publication_date: appDate};

    return callApi(
        apiServerUrl + '/store/status/submission/' + submissionId ,
        undefined,
        {
            method: 'PUT',
            body: JSON.stringify(result),
        },
    );
}