import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { resetGameStatus } from './gameStatus/gameStatusSlice';
import { resetOptions } from './options/optionsSlice';

/**
 * Component for showing a modal when the game is over.
 * @component
 */

const GameOverModal = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.gameStatus.gameOver);
  const winner = useSelector((state) => state.gameStatus.winner);
  const selections = useSelector((state) => state.gameStatus.selections);

  const plays = selections.reduce((acc, selection) => {
    if (selection.name) {
      return acc + 1;
    }
    return acc;
  }, -1);

  /**
   * When modal is closed, resets game and options components
   */
  const handleClose = () => {
    dispatch(resetGameStatus());
    dispatch(resetOptions());
  };

  const createContent = () => {
    if (winner) {
      return (
        <>
          <p>You won the game!</p>
          <p>
            You went from {selections[0].name} to{' '}
            {selections[selections.length - 1].name} in {plays} plays!
          </p>
        </>
      );
    }

    return <p>Sorry, you're out of turns. Please try again!</p>;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Game over!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{createContent()}</Modal.Body>
      <Modal.Footer>
        <Button variant="custom" className="custom-btn" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameOverModal;
