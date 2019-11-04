import { connect } from 'react-redux';
import ActionButton from './ActionButton';

import {
    TOGGLE_LOADING,
    TOGGLE_STARTED,
    UPDATE_ARCHIVE_LIST
} from '../actionTypes';

const mapStateToProps = state => ({
    csvFile: state.csvFile,
    pdfFiles: state.pdfFiles,
    loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch({ type: TOGGLE_LOADING }),
    toggleStarted: () => dispatch({ type: TOGGLE_STARTED }),
    updateArchiveList: archiveList => dispatch({ type: UPDATE_ARCHIVE_LIST, archiveList })
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
