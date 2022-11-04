import { newSubmissionState } from "./submissionState";

describe('submitState', () => {
    it('newSubmissionState', () => {
        const expected = {
            submissionQuery: {loading: false, count: 10, offset: 0},
            submissionResult: {submissions: [], tot_count: 0},

            submissionDialogOpen: false,
            submissionFilesDialogOpen: false,
            submissionMetaDialogOpen: false,
            submissionFileIssueDialogOpen: false,
            deleteSubmissionFileAlertOpen: false,
            deleteSubmissionAlertOpen: false,
            uploadSubmissionFileDialogOpen: false,
            setSubmissionPublicationDateDialogOpen: false,

            submissionId: '',
            dataFiles: [],
            docFiles: [],
            path: '',
            publicationDate: null,
            allowPublication: false,
            calibrationPath: "",
            calibrationSubmissionDialogOpen: false,
            currentDatasetValidationResults: [],
            currentSubmissionFiles: [],
            currentSubmissionId: '',

            selectedSubmission: {
                submission_id: '',
                user_id: 0,
                date: '',
                path: '',
                status: '',
                files: [],
                file_refs: [],
                publication_date: '',
                allow_publication: false
            },

            selectedSubmissionFile: {
                index: 0,
                submission_id: '',
                filename: '',
                status: 'OK',
                filetype: 'DOCUMENT',
                creationdate: '',
                result: {
                    status: 'OK',
                    issues: [],
                }
            },

            helpDialogOpen: false,
            submissionPublicationDate: null,

            submissionSucceeded: false,
            submissionMessages: [],
            newEntries: [],
            oldEntries: [],
        };

        expect(newSubmissionState()).toEqual(expected);
    });
});
