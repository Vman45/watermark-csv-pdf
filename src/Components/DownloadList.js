import React from 'react';

import { List, Typography } from 'antd';

export default class DownloadList extends React.Component {
    render() {
        return (
            <div>
                {this.props.archiveList.length > 0 && 
                    <List
                        header={<h3>List of generated files</h3>}
                        bordered
                        dataSource={this.props.archiveList}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <Typography.Text mark>
                                    <a 
                                        href={item.download}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                            Download
                                    </a>
                                </Typography.Text>{' '}
                                {item.description}
                            </List.Item>
                        )}
                    />
                }
            </div>
        );
    }
}