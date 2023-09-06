import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Person from './Person';
import { filterConnections } from '../utils/utils';

/**
 * Component for showing options to select from at each turn.
 * @component
 */

const Options = () => {
  const status = useSelector((state) => state.options.status);
  const error = useSelector((state) => state.options.error);
  const connections = useSelector((state) => state.options.connections);
  const currentSelections = useSelector((state) => state.gameStatus.selections);
  const filteredConnections = filterConnections(currentSelections, connections);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = filteredConnections.map((person) => (
      <Col key={person.id} className="text-center mb-5">
        <Person person={person} selected={false} />
      </Col>
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container className="mb-5 p-5 text-center white-bg rounded">
      <Row>
        <h4 className="pb-3">
          Choose your next play from the following connections:
        </h4>
      </Row>
      <Row>{content}</Row>
    </Container>
  );
};

export default Options;
