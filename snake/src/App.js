import { useState, useEffect } from 'react';
import './App.css';

const SIZE = 50

function Snake(x, y) {
  const positionX = x
  const positionY = y

  const style = {
    left: positionX * SIZE,
    top: positionY * SIZE,
  }

  return (
    <div className='snake' style={style}>
    </div>
  )
}

function Board() {
  const [direction, setDirection] = useState('right')
  const [snake, setSnake] = useState([
    [1, 2],
    [2, 2],
    [3, 2]
  ])

  function handle(e) {
    switch (e.keyCode) {
      case 38:
        setDirection('up')
        break;
      case 39:
        setDirection('right')
        break;
      case 40:
        setDirection('down')
        break;
      case 37:
        setDirection('left')
        break;
    }
  }

  function move() {
    const head = snake[snake.length - 1]
    let newHead = [head[0], head[1]]

    switch (direction) {
      case 'up':
        newHead[1] -= 1
        break;
      case 'right':
        newHead[0] += 1
        break;
      case 'down':
        newHead[1] += 1
        break;
      case 'left':
        newHead[0] -= 1
        break;
    }

    setSnake((snake) => {
      let tmp = [...snake, newHead]
      tmp.shift()
      return tmp
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', handle)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      move()
    }, 1000)

    return () => {
      clearInterval(t)
    }
  }, [move])

  return (
    <div className='board'>
      {snake.map((cell) => {
        return Snake(cell[0], cell[1])
      })}
    </div>

  )
}

function App() {
  return (
    <div className='container'>
      <Board />
    </div>
  );
}

export default App;
