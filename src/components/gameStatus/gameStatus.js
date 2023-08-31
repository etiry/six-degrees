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

  const content = selections.map((person, index) => {
    if (index === 0) {
      return (
        <Col key={index} className="d-flex align-items-center">
          <Col>
            <Person person={person} selected />
          </Col>
        </Col>
      );
    }

    return (
      <Col key={index} className="d-flex align-items-center">
        <Col>
          <p className="show-name">{person.commonShow}</p>
        </Col>
        <Col>
          <Person person={person} selected />
        </Col>
      </Col>
    );
  });

  return (
    <Container className="mb-5 p-5 text-center white-bg rounded">
      <Row>
        <h4 className="pb-3">Here are your current selections:</h4>
      </Row>
      <Row>{content}</Row>
    </Container>
  );
};

export default GameStatus;
