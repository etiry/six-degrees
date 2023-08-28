import { useSelector, useDispatch } from 'react-redux';
// import {
//   incrementCurrentDegree,
//   selectDegree
// } from './gameStatusSlice';
import { getConnections } from '../options/optionsSlice';
import Person from '../Person';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function GameStatus() {
  const dispatch = useDispatch();
  const selections = useSelector(state => state.gameStatus.selections);

  return (
    <Container>
      <Row>
        {selections.map((person) =>
          <Person key={person.id} person={person} />
        )}
      </Row>
    </Container>
  )
}