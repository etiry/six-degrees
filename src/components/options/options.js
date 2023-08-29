import { useSelector } from 'react-redux';
import Person from '../Person';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Options = () => {
  const optionsStatus = useSelector(state => state.options.status);
  const error = useSelector(state => state.options.error)
  const connections = useSelector(state => state.options.connections);
  const currentSelections = useSelector(state => state.gameStatus.selections);
  const currentSelectionNames = currentSelections.map(({ name }) => name).slice(0, -1);

  const filteredConnections = connections.filter((person) => {
    return !currentSelectionNames.includes(person.name);
  })

  let content;

  if (optionsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (optionsStatus === 'succeeded') {
    content = filteredConnections.map((person) => 
      <Col key={person.id} className="text-center">
        <Col>
          <Person person={person} />
          <p className="show-name">{person.previousCommonShow}</p>
        </Col>
      </Col>
    );
  } else if (optionsStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container>
      <Row>
        {content}
      </Row>
    </Container>
  );
};

export default Options;