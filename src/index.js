import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div
        onClick={() => {
          console.log("rooter click");
        }}
      >
        <p>我想出现在root中</p>
        <Test />
      </div>
    )
  }
}

function Test() {
  return ReactDOM.createPortal(
    <ChildA />,
    //     <h1>我想出现在container中</h1>,
    document.getElementById("container")
  );
}

function ChildA() {
  return <p>我是childA</p>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

