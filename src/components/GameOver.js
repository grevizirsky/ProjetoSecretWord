import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div>
      <h1>Fim do jogo!</h1>
      <h2>Sua pontuacao foi de: <span>{score}</span> pontos</h2>
      <button onClick={retry}>Reiniciar o jogo</button>
    </div>
  )
}

export default GameOver