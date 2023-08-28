import { useSelector } from 'react-redux';
import Person from '../Person';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Options = () => {
  const optionsStatus = useSelector(state => state.options.status);
  const error = useSelector(state => state.options.error)
  const connections = useSelector(state => state.options.connections);

  let content;

  if (optionsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (optionsStatus === 'succeeded') {
    content = connections.map((person) => 
      <Person key={person.id} person={person} />
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