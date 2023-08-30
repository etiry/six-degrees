import GameOverModal from '../components/gameOverModal';
import GameStatus from '../components/gameStatus/gameStatus';
import Options from '../components/options/options';

/**
 * Component for displaying page child components.
 * @component
 */

const Main = () => (
  <>
    <GameStatus />
    <Options />
    <GameOverModal />
  </>
);

export default Main;
