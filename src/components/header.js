import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import defaultStartingOptions from '../assets/defaultStartingOptions.json';
import {
  incrementCurrentDegree,
  updateDegree,
  startGame,
  resetGameStatus
} from '../slices/gameStatusSlice';
import { resetOptions, getConnections } from '../slices/optionsSlice';
import ChangeTargetModal from './changeTargetModal';
import { getRandomOption } from '../utils/utils';

/**
 * Component for showing page header.
 * @component
 */

const Header = () => {
  const dispatch = useDispatch();
  const { startingOptions } = defaultStartingOptions;
  const gameInProgress = useSelector(
    (state) => state.gameStatus.gameInProgress
  );
  const [showModal, setShowModal] = useState(false);

  /**
   * When button is clicked, selects a random option and
   * updates game status and options components
   */
  const handleStartGameClick = () => {
    dispatch(startGame());
    const randomFirstSelection = getRandomOption(startingOptions);
    dispatch(updateDegree(randomFirstSelection));
    dispatch(getConnections(randomFirstSelection.id));
    dispatch(incrementCurrentDegree());
  };

  /**
   * When button is clicked, resets game status and options components
   */
  const handleResetClick = () => {
    dispatch(resetGameStatus());
    dispatch(resetOptions());
  };

  /**
   * When button is clicked, open modal to allow player to change
   * target actor
   */
  const handleChangeTargetClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home">Six Degrees of TV</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link
                  onClick={handleStartGameClick}
                  disabled={gameInProgress}
                >
                  Start Game
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link onClick={handleResetClick}>Reset Game</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link onClick={handleChangeTargetClick}>
                  Change Target Actor
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/how-to-play">
                <Nav.Link>How to Play</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ChangeTargetModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );

  // return (
  //   <>
  //     <Navbar className="bg-body-tertiary">
  //       <Container>
  //         <LinkContainer to="/">
  //           <Navbar.Brand>Six Degrees of TV</Navbar.Brand>
  //         </LinkContainer>
  //         <div>
  //           <LinkContainer to="/">
  //             <Button
  //               variant="custom"
  //               className="custom-btn"
  //               onClick={handleStartGameClick}
  //               disabled={gameInProgress}
  //             >
  //               Start game
  //             </Button>
  //           </LinkContainer>
  //           <LinkContainer to="/">
  //             <Button
  //               variant="custom"
  //               className="custom-btn"
  //               onClick={handleResetClick}
  //             >
  //               Reset game
  //             </Button>
  //           </LinkContainer>
  //           <LinkContainer to="/">
  //             <Button
  //               variant="custom"
  //               className="custom-btn"
  //               onClick={handleChangeTargetClick}
  //             >
  //               Change target actor
  //             </Button>
  //           </LinkContainer>
  //         </div>
  //         <div className="d-flex">
  //           <LinkContainer to="/how-to-play">
  //             <Nav.Link className="p-3">How to Play</Nav.Link>
  //           </LinkContainer>
  //           <LinkContainer to="/about">
  //             <Nav.Link className="p-3">About</Nav.Link>
  //           </LinkContainer>
  //         </div>
  //       </Container>
  //     </Navbar>
  //     <ChangeTargetModal showModal={showModal} setShowModal={setShowModal} />
  //   </>
  // );
};

export default Header;
