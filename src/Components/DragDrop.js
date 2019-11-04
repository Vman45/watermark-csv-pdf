import React from 'react';
import request from 'request';

import { Upload, Icon, message } from 'antd';

const { Dragger } = Upload;

const { replaceAllNonAlpha } = require('../Library/Custom');

export default class DragDrop extends React.Component {
    constructor(props) {
      super(props);

      this.state = { 
        fileType: 0,
        uploadError: false
      };
    }

    onChange(info, self) {
      const { status } = info.file;
      const isCsv = self.state.fileType === 0;

      if (status === 'done') {
        message.success(`'${info.file.name}' uploaded successfully.`);

        if(isCsv) {
          self.props.updateCsvFile(info.file.response.filename);
          self.setState({ fileType: 1 });
          return;
        }

        const pdfs = self.props.pdfFiles;
        pdfs.push(info.file.response.filename);

        self.props.updatePdfFiles(pdfs);
      } else if (status === 'error') {
        message.error(info.file.response.message);
        self.setState({ uploadError: true });
      }
    }

    beforeUpload(file, self) {
      const extension = file.name.split('.').pop().toLowerCase();
      const isCsv = self.state.fileType === 0;

      if(isCsv && extension !== 'csv') {
        message.error(`'${file.name}' is not csv`);
        return false;
      }
      if(!isCsv && extension !== 'pdf') {
        message.error(`'${file.name}' is not pdf`);
        return false;
      }

      if(self.props.pdfFiles.length > 2) {
        message.error('File Limit Exceeded');
        return false;
      }

      return true;
    }

    onRemove(file, self) {
      if(self.state.uploadError) {
        self.setState({ uploadError: false });
        return true;
      }

      const extension = file.name.split('.').pop().toLowerCase();

      request.delete({
        url: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/upload`,
        qs: { file }
      }, err => {
        if(err) {
          message.error(`Internal error: ${err}`);
          return;
        }

        if(extension === 'csv') {
          self.props.updateCsvFile('');
          self.setState({ fileType: 0 });
        }
        else if (extension === 'pdf') {
          const filename = replaceAllNonAlpha(file.name);
          const pdfs = self.props.pdfFiles.filter(origName => origName !== filename);

          self.props.updatePdfFiles(pdfs);
        }
      });

      return true;
    }

    onDownload({ name }) {
      const extension = name.split('.').pop().toLowerCase();
      window.open(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/download?f=${replaceAllNonAlpha(name)}.${extension}`,
        '_blank',
        'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400'
      );
    }

    render() {
        const isCsv = this.state.fileType === 0,
        props = {
          name        : 'userFile',
          accept      : isCsv ? '.csv' : '.pdf',
          action      : `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/upload`,
          multiple    : !isCsv,
          disabled    : this.props.started,
          onChange    : info => this.onChange(info, this),
          beforeUpload: file => this.beforeUpload(file, this),
          onRemove    : file => this.onRemove(file, this),
          onDownload  : file => this.onDownload(file)
        };

        return <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">{isCsv ? 
                'Drag or select CSV file' :
                'Drag or select PDF files'}</p>
            <p className="ant-upload-hint">{isCsv ?
                'Imports records from CSV file (Limit: 50 records)' :
                'Import PDFs to apply watermark (Limit: 3 files)'}</p>
      </Dragger>;
    }
}