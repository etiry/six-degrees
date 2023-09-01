import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchForm from './searchForm';

/**
 * Component for showing a modal to change the target actor.
 * @component
 */

const ChangeTargetModal = ({ showModal, setShowModal }) => {
  /**
   * When modal is closed, resets game and options components
   */
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change target actor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SearchForm setShowModal={setShowModal} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="custom" className="custom-btn" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ChangeTargetModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool
};

export default ChangeTargetModal;
