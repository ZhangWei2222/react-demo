import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};
const ThemeContext = React.createContext({
  theme: themes.dark, // 默认值
  toggleTheme: () => { },
});

class App extends React.Component {
  constructor(props) {
    super(props)

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.light ? themes.dark : themes.light
      }))
    }

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme
    }
  }

  render() {
    return (
      // 使用 Context.Provider 包裹后续组件，value 指定值 
      /* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */
      <ThemeContext.Provider value={this.state} >
        <Content></Content>
      </ThemeContext.Provider >
    )
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  )
}

function ThemeTogglerButton() {
  return (
    // Context.Consumer Consumer消费者使用Context得值
    // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background }}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

