import React from 'react';
import Board from 'components/Board';
import { startGame } from 'ducks/game';
import { updateDirection } from 'ducks/snake';
import { connect } from 'react-redux';
import { DIRECTIONS } from 'config';
import Mousetrap from 'mousetrap';

class Game extends React.Component {
  componentDidMount() {
    this.props.startGame();
    [
      ['up', DIRECTIONS.TOP],
      ['right', DIRECTIONS.RIGHT],
      ['down', DIRECTIONS.BOTTOM],
      ['left', DIRECTIONS.LEFT],
    ].map(([key, direction]) => (
      Mousetrap.bind(key, () => (
        this.props.updateDirection(direction)
      ))
    ));
  }

  render() {
    return (
      <div>
        <h1>Game</h1>
        <button onClick={() => this.props.gameTick()}>NEXT TICK</button>
        {[
          DIRECTIONS.TOP,
          DIRECTIONS.RIGHT,
          DIRECTIONS.BOTTOM,
          DIRECTIONS.LEFT,
        ].map((direction) => (
          <button
            key={direction}
            onClick={() => this.props.updateDirection(direction)}
          >
            {direction}
          </button>
        ))}
        <Board />
      </div>
    );
  }
}

const enhance = connect(null, {
  startGame,
  updateDirection,
});

export default enhance(Game);
