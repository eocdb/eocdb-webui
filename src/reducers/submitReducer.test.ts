import { submitReducer } from "./submitReducer";
import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    SUBMIT_FILES,
    SubmitFiles, UPDATE_DATA_FILES, UPDATE_DOC_FILES, UpdateDataFiles, UpdateDocFiles
} from "../actions/submitActions";



describe('submitStepsReducer', () => {
    it('submitReducer to open submit steps', () => {
        const result = submitReducer(undefined, {type: OPEN_SUBMIT_STEPS});
        expect(result.submitStepsOpen).toEqual(true);
    });

    it('submitReducer to close submit steps', () => {
        const result = submitReducer(undefined, {type: CLOSE_SUBMIT_STEPS});
        expect(result.submitStepsOpen).toEqual(false);
    });

    it('reducing updateDataFiles', () => {
        const action: UpdateDataFiles = {
            type: UPDATE_DATA_FILES,
            dataFiles: [],
        };
        const result = submitReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
    });

    it('reducing updateDocFiles', () => {
        const action: UpdateDocFiles = {
            type: UPDATE_DOC_FILES,
            docFiles: [],
        };
        const result = submitReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
    });
    it('submitReducer to submit files', () => {
        const action: SubmitFiles = {
            type: SUBMIT_FILES,
            dataFiles: [],
            docFiles: [],
        };
        const result = submitReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
        expect(result.docFiles.length).toEqual(0);
    });

});

