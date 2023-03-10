import './App.css';

//HOOKS
import { useCallback, useEffect, useState } from 'react'

//DATA
import { wordsList } from "./data/words"

//COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//STAGES
const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  //STARTS  THE SECRET WORD GAME
  const startGame = () => {
    setGameStage(stages[1].name)
  }

  //PROCESS THE LETTER INPUT
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //RESTART THE GAME
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
