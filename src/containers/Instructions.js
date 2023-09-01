/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Component for showing game instructions.
 * @component
 */

const Instructions = () => (
  <Container className="mb-5 p-5 white-bg rounded">
    <Row className="text-center">
      <Col>
        <h4 >How to Play</h4>
      </Col>
    </Row>
    <Row>
      <Col className="col-6 offset-3">
      <p>
          According to 
          <a href="https://en.wikipedia.org/wiki/Six_degrees_of_separation">
            Wikipedia
          </a>
          , "Six degrees of separation is the idea that all people are six or
          fewer social connections away from each other. As a result, a chain of
          "friend of a friend" statements can be made to connect any two people
          in a maximum of six steps."
        </p>
        <p>
          This idea was later applied to a game called Six Degrees of Kevin
          Bacon, where the aim is "to arbitrarily choose an actor and then
          connect them to another actor via a film that both actors have
          appeared in together, repeating this process to try to find the
          shortest path that ultimately leads to prolific American actor Kevin
          Bacon." 
          <a href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon">
            (Wikipedia)
          </a>
        </p>
        <ul>
        <li>
            The goal of the game is to connect a randomly selected actor
            to Kevin Bacon using connections defined by being a cast
            member of the same TV show in six connections or less.
          </li>
          <li>
            When you click "Start Game", an actor will be randomly selected
            to be the starting actor.
          </li>
          <li>
            Any actor who was a cast member of any of the TV shows that the
            starting actor was also a cast member of will appear in the box
            options below.
          </li>
          <li>
            Select one of the options and they will appear in the gameboard
            at the top. The box of options will then show the actors who
            were cast members of any of the TV shows that the second actor
            was a cast member of.
          </li>
          <li>
            You can only select an actor once.
          </li>
          <li>
            Repeat until you either run out of plays or you find Kevin Bacon!
          </li>
        </ul>
        <Link to="/">Back to Game</Link>
      </Col>
    </Row>
  </Container>
);

export default Instructions;
