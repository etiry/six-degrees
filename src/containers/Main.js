import GameOverModal from '../components/gameOverModal';
import GameStatus from '../components/gameStatus/gameStatus';
import Options from '../components/options/options';

const Main = () => {
  return (
    <>
      <GameStatus />
      <Options />
      <GameOverModal />
    </>
  )
}

export default Main;