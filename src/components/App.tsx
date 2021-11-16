import { useState } from 'react';
import calculateWinner from '../helpers/calculateWinner';
import './App.css';

interface SquareProps {
  value?: string | null;
  onClick?: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (idx: number) => {
    if (calculateWinner(squares) || squares[idx]) return;
    const newSquares = [...squares];
    newSquares[idx] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setSquares(newSquares);
  };

  const renderSquare = (idx: number) => {
    return <Square value={squares[idx]} onClick={() => handleClick(idx)} />;
  };

  let status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  const winner = calculateWinner(squares);
  if (winner) status = 'Winner: ' + winner;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <br />
      <button onClick={() => setSquares(Array(9).fill(''))}>
        Restart The Game
      </button>
    </div>
  );
};

const Game: React.FC = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
