import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import defaultStartingOptions from './defaultStartingOptions.json';
import {
  incrementCurrentDegree,
  updateDegree,
  startGame,
  resetGameStatus
} from '../components/gameStatus/gameStatusSlice';
import {
  resetOptions,
  getConnections
} from '../components/options/optionsSlice';

/**
 * Component for showing page header.
 * @component
 */

function Header() {
  const dispatch = useDispatch();
  const { startingOptions } = defaultStartingOptions;
  const gameInProgress = useSelector(
    (state) => state.gameStatus.gameInProgress
  );

  /**
   * Select a random item from an array of person objects
   * @param {array} optionArray Array of options
   *
   * @return {object} Person to act as starting point for game
   */
  const getRandomOption = (optionArray) =>
    optionArray[Math.floor(Math.random() * optionArray.length)];

  /**
   * When button is clicked, selects a random option and
   * updates game status and options components
   */
  const handleStartGameClick = () => {
    dispatch(startGame());
    const randomFirstSelection = getRandomOption(startingOptions);
    dispatch(updateDegree(randomFirstSelection));
    dispatch(getConnections(randomFirstSelection.id));
    dispatch(incrementCurrentDegree());
  };

  /**
   * When button is clicked, resets game status and options components
   */
  const handleResetClick = () => {
    dispatch(resetGameStatus());
    dispatch(resetOptions());
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Six Degrees</Navbar.Brand>
        <div>
          <Button
            variant="custom"
            className="custom-btn"
            onClick={handleStartGameClick}
            disabled={gameInProgress}
          >
            Start game
          </Button>
          <Button
            variant="custom"
            className="custom-btn"
            onClick={handleResetClick}
          >
            Reset game
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
