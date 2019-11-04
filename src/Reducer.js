import * as Action from './actionTypes';

const initialState = {
    csvFile         : '',
    pdfFiles        : [],
    loading         : false,
    archiveList     : [],
    started         : false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case Action.UPDATE_CSV_FILE:
            return {
                ...state,
                csvFile: action.csvFile
            };
        case Action.UPDATE_PDF_FILES:
            return {
                ...state,
                pdfFiles: action.pdfFiles.slice()
            };
        case Action.TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            };
        case Action.UPDATE_ARCHIVE_LIST:
            return {
                ...state,
                archiveList: action.archiveList.slice()
            };
        case Action.TOGGLE_STARTED:
            return {
                ...state,
                started: !state.started
            };
        default:
            return state;
    }
};