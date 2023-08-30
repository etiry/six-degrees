import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { resetGameStatus } from './gameStatus/gameStatusSlice';
import { resetOptions } from './options/optionsSlice';

const GameOverModal = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.gameStatus.gameOver);
  const winner = useSelector((state) => state.gameStatus.winner);

  const handleClose = () => {
    dispatch(resetGameStatus());
    dispatch(resetOptions());
  };

  let content = "Sorry, you're out of turns. Please try again!";

  if (winner) {
    content = 'You won the game!';
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Game over!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameOverModal;
