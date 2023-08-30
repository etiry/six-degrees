import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Person from '../Person';

/**
 * Component for showing the status of the game/actor selections.
 * @component
 */

const GameStatus = () => {
  const selections = useSelector((state) => state.gameStatus.selections);

  return (
    <Container className="mb-5 text-center">
      <Row>
        {selections.map((person, index) => (
          <Col key={index} className="d-flex align-items-center">
            <Col>
              <p className="show-name">{person.commonShow}</p>
            </Col>
            <Col>
              <Person person={person} selected />
            </Col>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GameStatus;
