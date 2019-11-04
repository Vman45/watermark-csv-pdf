import { connect } from 'react-redux';
import DragDrop from './DragDrop';

import { UPDATE_CSV_FILE, UPDATE_PDF_FILES } from '../actionTypes';

const mapStateToProps = state => ({
    csvFile: state.csvFile,
    pdfFiles: state.pdfFiles,
    loading: state.loading,
    started: state.started
});

const mapDispatchToProps = dispatch => ({
    updateCsvFile:  csvFile => dispatch({ type: UPDATE_CSV_FILE, csvFile }),
    updatePdfFiles: pdfFiles => dispatch({ type: UPDATE_PDF_FILES, pdfFiles })
});

export default connect(mapStateToProps, mapDispatchToProps)(DragDrop);
