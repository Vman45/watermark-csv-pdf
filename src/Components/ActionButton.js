import React from 'react';
import request from 'request';

import { Button, message } from 'antd';
export default class ActionButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = { folderId: '' };

        this.archives = [];
    }

    sendRequest(endpoint, data) {
        return new Promise((resolve, reject) => {
            request.post({
                uri: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/${endpoint}`,
                qs: data
            }, (err, resp) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(resp);
            }); 
        });
    }

    async onClick() {
        this.props.toggleStarted();
        this.props.toggleLoading();
        await this.sendRequest('handle-files', { 
            csvFile: this.props.csvFile,
            pdfFiles: this.props.pdfFiles
         }).then(resp => {
            const body = JSON.parse(resp.body);
            this.setState({ folderId: body.folderId });
            message.success(body.message);
        }).catch(err => {
            if(err.length > 0) {
                message.error(err);
                return;
            }
            message.error('Internal error');
        });
        this.props.toggleLoading();
    }

    async onDownloadClick() {
        this.props.toggleLoading();
        message.warn('The files are being compressed. This may take a while...', 10);
        await this.sendRequest('zip-files', {
            folderId: this.state.folderId
        }).then(resp => {
            const body      = JSON.parse(resp.body),
            downloadLink = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/download?f=${this.state.folderId}.zip`;

            message.success(body.message);
            window.open(
                downloadLink,
                '_blank',
                'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400'
            );
            this.archives.push({
                description: `Generated using '${this.props.csvFile}' CSV file`,
                download: downloadLink
            });
            this.props.updateArchiveList(this.archives);
        }).catch(err => {
            if(err.length > 0) {
                message.error(err);
                return;
            }
            message.error('Internal error');
        });
        this.setState({ folderId: '' });
        this.props.toggleLoading();
        this.props.toggleStarted();
    }

    render() {
        if(this.props.csvFile === '' || this.props.pdfFiles.length < 1)
            return <div></div>;

        return (
            <div>
                {this.state.folderId.length === 0 ? 
                   <Button
                    type="primary"
                    loading={this.props.loading}
                    onClick={this.onClick.bind(this)}>
                    Generate Watermark
                  </Button>
                : <Button
                    type="dashed"
                    loading={this.props.loading}
                    onClick={this.onDownloadClick.bind(this)}>
                    Generate ZIP File
                 </Button>}
            </div>
        );
    }
}