import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'zw'
    }
  }

  render() {
    return (<div>{this.state.name}</div>)
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

