import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import GameOverModal from '../components/gameOverModal';
import GameStatus from '../components/gameStatus/gameStatus';
import Options from '../components/options/options';
import Instructions from './Instructions';
import About from './About';

/**
 * Component for displaying page child components.
 * @component
 */

const Main = () => (
  <Container fluid className="p-3">
    <Routes>
      <Route
        path="/"
        element={
          <>
            <GameStatus />
            <Options />
            <GameOverModal />
          </>
        }
      />
      <Route path="/how-to-play" element={<Instructions />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Container>
);

export default Main;
