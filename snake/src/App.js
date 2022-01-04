import { useState, useEffect } from 'react';
import './App.css';

function Board() {
  const SIZE = 10
  const STARTX = 5
  const STARTY = 5
  const FRAMERATE = 1
  
  const RIGHT = 0
  const DOWN = 1
  const LEFT = 2
  const UP = 3


  const [board, setBoard] = useState([])
  const [snake, setSnake] = useState([])
  const [direction, setDirection] = useState(RIGHT)

  useEffect(() => {
    init()
    setInterval(() => {
      move()
    }, 1000 / FRAMERATE) 
  }, [])

  function init() {
    setBoard(Array.from(Array(SIZE).fill().map((_, rowIndex) => {
      return Array.from(Array(SIZE).fill().map((_, cellIndex) => {
        return [cellIndex, rowIndex, 'cell']
      }))
    })))
    setSnake(Array.from(Array(3).fill().map((_, index) => {
      return [STARTX - index, STARTY, RIGHT]
    })))
  }

  function checkState() {
    board.forEach((row) => {
      row.forEach((cell) => {
        cell[2] = 'cell'
        snake.forEach((part) => {
          if (cell[0] === part[0] && cell[1] === part[1]) {
            cell[2] = 'cell snake'
          }
        })
      })
    })
  }

  function move() {
  }

  function DrawBoard() {
    checkState()
    return (
      <div className='board'>
        {board.map((row) => 
          <div key={row}>
            {row.map((cell) => 
              <div className={cell[2]} key={cell}>
                {cell[0]}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return <DrawBoard />
}

function App() {
  return (
    <div className='container'>
      <Board />
    </div>
  );
}

export default App;
