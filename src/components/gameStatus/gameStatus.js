import { useSelector, useDispatch } from 'react-redux';
import {
  incrementCurrentDegree,
  selectDegree
} from './gameStatusSlice';
import Person from '../Person';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function GameStatus() {
  const currentDegree = useSelector(state => state.gameStatus.currentDegreeIndex);
  const selections = useSelector(state => state.gameStatus.selections);

  return (
    <Container>
      <Row>
        {selections.map((person, index) => 
          <Person key={selections[index].id} person={selections[index]} />
        )}
      </Row>
    </Container>
  )
}