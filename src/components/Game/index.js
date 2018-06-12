import React from 'react';
import Board from 'components/Board';
import { startGame, resetGame } from 'ducks/game';
import { updateDirection } from 'ducks/snake';
import { connect } from 'react-redux';
import { DIRECTIONS } from 'config';
import Mousetrap from 'mousetrap';
import { scoreSelector } from 'selectors';

class Game extends React.Component {
  componentDidMount() {
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
        <p>
          <button onClick={() => this.props.startGame()}>START</button>
          <button onClick={() => this.props.resetGame()}>RESET</button>
          <strong>Score: </strong><i>{this.props.score}</i>
        </p>
        <p>
          by <a href="http://michaltaberski.com" target="_blank">Michal Taberski</a>, source <a href="https://github.com/michaltaberski/react-snake">Github michaltaberski/react-snake</a>
        </p>
        <Board />
      </div>
    );
  }
}

const enhance = connect((state) => ({
  score: scoreSelector(state),
}), {
  startGame,
  resetGame,
  updateDirection,
});

export default enhance(Game);
