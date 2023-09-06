/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPeople } from '../utils/utils';
import { changeTarget } from '../slices/gameStatusSlice';

function SearchForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleFormSubmit = async (event, value) => {
    event.preventDefault();
    setSearchResults(await fetchPeople(value));
    setSearchTerm('');
  };

  const handleSelectNewTarget = (newTarget) => {
    dispatch(changeTarget(newTarget));
    setShowModal(false);
  };

  return (
    <>
      <Form onSubmit={(event) => handleFormSubmit(event, searchTerm)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter actor name here"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Form.Group>

        <Button variant="custom" className="custom-btn" type="submit">
          Search
        </Button>
      </Form>
      <Container>
        <Row className="justify-content-center">
          {searchResults.map((result) => (
            <p key={result.id} onClick={() => handleSelectNewTarget(result)}>
              {result.name}
            </p>
          ))}
        </Row>
      </Container>
    </>
  );
}

SearchForm.propTypes = {
  setShowModal: PropTypes.func
};

export default SearchForm;
