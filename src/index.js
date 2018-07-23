import React from 'react';
import ReactDOM from 'react-dom';
import Transfer from './Transfer';

import './styles.css';
const dataLoad = {
  dataSource: [
    { title: 'Denver', key: 1, disabled: false },
    { title: 'Tampa', key: 2, disabled: true },
    { title: 'Indiana', key: 3, disabled: false },
    { title: 'Central Texas', key: 4, disabled: false },
    { title: 'New York', key: 5, disabled: false },
  ],
  targetKeys: [],
  title: 'Market',
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Transfer dataSource={dataLoad.dataSource} title={dataLoad.title} />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
