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
  //HOOKS
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])//LETRAS CHUTADAS
  const [wrongLetters, setWrongLetters] = useState([])//LETRAS ERRADAS
  const [guesses, setGuesses] = useState(3)//TENTATIVAS
  const [score, setScore] = useState(0)//PONTUACAO


  const pickWordAndCategory = () => {
    //PICK A RANDOM CATEGORY
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    //console.log(category)

    //PICK A RANDOM WORD
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    //console.log(word)

    return {word, category}
  }

  //STARTS  THE SECRET WORD GAME
  const startGame = () => {
    //pick word and pick category
    const {word, category} = pickWordAndCategory()

    //create an array of letters
     let wordLetters = word.split("")
     wordLetters = wordLetters.map((l) => l.toLowerCase())

     //fill states
     setPickedWord(word)
     setPickedCategory(category)
     setLetters(wordLetters)

    console.log(word, category)
    console.log(wordLetters)

    setGameStage(stages[1].name)
  }

  //PROCESS THE LETTER INPUT
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase()

    //checked if letter has already been used
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, 
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, 
        normalizedLetter
      ])
    }
  }
  console.log(guessedLetters)
  console.log(wrongLetters)

  //RESTART THE GAME
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && 
      <Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
