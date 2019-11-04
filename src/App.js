import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

import { Provider } from 'react-redux';
import { Store } from './Store';

import { Layout } from 'antd';

import DragDropContainer from './Components/DragDropContainer';
import ActionButtonContainer from './Components/ActionButtonContainer';
import DownloadListContainer from './Components/DownloadListContainer';

const { Content } = Layout;

export default class App extends React.Component {

  componentDidMount() {
    window.document.title = process.env.REACT_APP_NAME;
  }

  render() {
    return (
      <Provider store={Store}>
        <div className="App">
          <Layout className="Layout">
            <Content className="App-Content">
              <div className="App-DragDrop-Container">
                <DragDropContainer />
              </div>
              <div className="App-Button-Container">
                <ActionButtonContainer />
              </div>
              <div className="App-DownloadList-Container">
                <DownloadListContainer />
              </div>
            </Content>
          </Layout>
        </div>
      </Provider>
    );
  }
}