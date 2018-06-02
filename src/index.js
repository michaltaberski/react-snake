import React from 'react';
import ReactDOM from 'react-dom';
import Game from 'components/Game';
import { Provider } from  'react-redux';
import configureStore from 'root/configureStore';

class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Game />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
