/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Component for showing game instructions.
 * @component
 */

const About = () => (
  <Container className="mb-5 p-5 white-bg rounded">
    <Row className="text-center">
      <Col>
        <h4 className="pb-3">About</h4>
      </Col>
    </Row>
    <Row>
      <Col className="col-6 offset-3">
      <p>
        This project was created by Emily Tiry as a project
        for the Parsity code school to display front-end
        web development skills.
      </p>
      <h6>Technologies</h6>
        <ul>
          <li>
            React
          </li>
          <li>
            Redux Toolkit
          </li>
        </ul>
        <h6>Attributions</h6>
        <ul>
          <li>
            Mystery person icon created by <a href="https://www.flaticon.com/free-icons/mystery" title="mystery icons">imaginationlol - Flaticon</a>
          </li>
          <li>
            Background from <a href="https://heropatterns.com/">Hero Patterns</a>
          </li>
        </ul>
        <Link to="/">Back to Game</Link>
      </Col>
    </Row>
  </Container>
);

export default About;
