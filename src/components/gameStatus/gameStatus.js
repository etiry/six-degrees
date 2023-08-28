import { useSelector } from 'react-redux';
import Person from '../Person';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const GameStatus = () => {
  const selections = useSelector(state => state.gameStatus.selections);

  return (
    <Container>
      <Row>
        {selections.map((person, index) =>
          <Person key={index} person={person} />
        )}
      </Row>
    </Container>
  )
}

export default GameStatus;