import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import defaultStartingOptions from './defaultStartingOptions.json';
import { incrementCurrentDegree, updateDegree, resetGameStatus } from '../components/gameStatus/gameStatusSlice';
import { resetOptions } from '../components/options/optionsSlice';
import { getConnections } from '../components/options/optionsSlice';

function Header() {
  const dispatch = useDispatch();
  const startingOptions = defaultStartingOptions.startingOptions;

  const getRandomOption = (optionArray) => {
    return optionArray[(Math.floor(Math.random() * optionArray.length))] 
  };

  const handleGetRandomClick = () => {
    const randomFirstSelection = {...getRandomOption(startingOptions)};
    randomFirstSelection.selected = true;
    dispatch(updateDegree(randomFirstSelection));
    dispatch(getConnections(randomFirstSelection.id));
    dispatch(incrementCurrentDegree());
  };

  const handleResetClick = () => {
    dispatch(resetGameStatus());
    dispatch(resetOptions());
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Six Degrees</Navbar.Brand>
        <Button variant="primary" onClick={handleGetRandomClick}>Get random starting actor</Button>
        <Button variant="primary" onClick={handleResetClick}>Reset game</Button>
      </Container>
    </Navbar>
  );
}

export default Header;
