import { connect } from 'react-redux';
import DownloadList from './DownloadList';

const mapStateToProps = state => ({
    archiveList: state.archiveList,
});

export default connect(mapStateToProps)(DownloadList);
