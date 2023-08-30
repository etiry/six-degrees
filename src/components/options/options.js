import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Person from '../Person';

/**
 * Component for showing options to select from at each turn.
 * @component
 */

const Options = () => {
  const status = useSelector((state) => state.options.status);
  const error = useSelector((state) => state.options.error);
  const connections = useSelector((state) => state.options.connections);
  const currentSelections = useSelector((state) => state.gameStatus.selections);
  const currentSelectionNames = currentSelections
    .map(({ name }) => name)
    .slice(0, -1);
  const filteredConnections = connections.filter(
    (person) => !currentSelectionNames.includes(person.name)
  );

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = filteredConnections.map((person) => (
      <Col key={person.id} className="text-center">
        <Col>
          <Person person={person} selected={false} />
          <p className="show-name">{person.commonShow}</p>
        </Col>
      </Col>
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  );
};

export default Options;
