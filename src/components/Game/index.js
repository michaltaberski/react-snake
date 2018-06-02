import React from 'react';
import Board from 'components/Board';
import { gameTick } from 'ducks/game';
import { connect } from 'react-redux';

class Game extends React.Component {
  // componentDidMount() {
  //   setInterval(this.props.gameTick, 1000);
  // }

  render() {
    return (
      <div>
        <h1>Game</h1>
        <button onClick={() => this.props.gameTick()}>NEXT TICK</button>
        <Board />
      </div>
    );
  }
}

const enhance = connect(null, {
  gameTick,
});

export default enhance(Game);
