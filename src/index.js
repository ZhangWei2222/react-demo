import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor() {
    super()
    // 你可以直接获取 DOM button 的 ref：
    this.ref = React.createRef();
  }


  add = () => {
    console.log('==', this.ref.current)
  }

  render() {
    const FancyButton = React.forwardRef((props, ref) => (  //作为第二个参数接收
      <button ref={ref} className="FancyButton" onClick={this.add}>
        {props.children}
      </button>
    ));


    return (
      <FancyButton ref={this.ref} >Click me!</FancyButton>)
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

