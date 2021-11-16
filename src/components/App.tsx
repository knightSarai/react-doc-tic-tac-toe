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

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  const renderSquare = (idx: number) => {
    return <Square value={squares[idx]} onClick={() => onClick(idx)} />;
  };

  return (
    <div>
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
    </div>
  );
};

type gameState = Array<{ squares: string[] }>;

const Game: React.FC = () => {
  const [history, setHistory] = useState<gameState>([
    { squares: Array(9).fill('') },
  ]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [steps, setSteps] = useState<number>(0);

  const handleClick = (idx: number) => {
    const newHistory = history.slice(0, steps + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[idx]) return;

    const newSquares = [...squares];
    newSquares[idx] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setHistory([...newHistory, { squares: newSquares }]);
    setSteps(newHistory.length);
  };

  let status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  const current = history[steps];
  const winner = calculateWinner(current.squares);
  if (winner) status = 'Winner: ' + winner;

  const jumpTo = (move: number) => {
    setSteps(move);
    setXIsNext(move % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(idx: number) => handleClick(idx)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => setHistory([{ squares: Array(9).fill('') }])}>
          Restart The Game
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
