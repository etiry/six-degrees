import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import Person from './person';
import { declareWinner, declareLoser } from '../slices/gameStatusSlice';
import { checkWinner } from '../utils/utils';

/**
 * Component for showing the status of the game/actor selections.
 * @component
 */

const GameStatus = () => {
  const dispatch = useDispatch();
  const selections = useSelector((state) => state.gameStatus.selections);
  const currentDegree = useSelector(
    (state) => state.gameStatus.currentDegreeIndex
  );
  const target = useSelector(
    (state) =>
      state.gameStatus.selections[state.gameStatus.selections.length - 1]
  );
  const options = useSelector((state) => state.options.connections);

  /**
   * When options state changes, checks to see what play it
   * is. If there are still plays left, checks if target
   * actor is included in options. If so, declares winner.
   * If no plays left, declares loser.
   */
  useEffect(() => {
    if (currentDegree < 5) {
      if (checkWinner(target, options)) {
        dispatch(declareWinner());
      }
    } else {
      dispatch(declareLoser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const content = selections.map((person, index) => {
    if (index === 0) {
      return (
        <Col key={index} className="d-flex align-items-center flex-grow-0">
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
