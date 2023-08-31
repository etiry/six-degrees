/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { getConnections } from './options/optionsSlice';
import {
  incrementCurrentDegree,
  updateDegree,
  declareWinner,
  declareLoser
} from './gameStatus/gameStatusSlice';

/**
 * Component for showing image, name, and show for each person.
 * @component
 */

const Person = ({ person, selected }) => {
  const dispatch = useDispatch();
  const currentDegree = useSelector(
    (state) => state.gameStatus.currentDegreeIndex
  );
  const target = useSelector(
    (state) =>
      state.gameStatus.selections[state.gameStatus.selections.length - 1]
  );

  /**
   * Checks if the selected actor is the same as the target actor
   * @param {object} selectedPerson Selected person
   * @param {object} targetPerson Target person
   *
   * @return {boolean}
   */
  const checkWinner = (selectedPerson, targetPerson) =>
    selectedPerson.id === targetPerson.id;

  /**
   * When person is clicked, checks if there is a winner.
   * If so, declare winner.
   * If not, if there are still plays left, updates the game status
   * and options components.
   * If there are no plays left, declare loser.
   */
  const handleSelectionClick = () => {
    if (checkWinner(person, target)) {
      dispatch(declareWinner());
    } else if (currentDegree < 5) {
      dispatch(updateDegree(person));
      dispatch(getConnections(person.id));
      dispatch(incrementCurrentDegree());
    } else {
      dispatch(declareLoser());
    }
  };

  if (selected) {
    return (
      <div className="avatar-big text-center">
        <Image src={person.imgUrl} className="avatar-img rounded-circle" />
        <p className="person-name">{person.name}</p>
      </div>
    );
  }

  return (
    <div
      className="avatar-big text-center"
      onClick={handleSelectionClick}
      role="button"
      tabIndex="-1"
    >
      <Image src={person.imgUrl} className="avatar-img rounded-circle" />
      <p className="person-name">{person.name}</p>
    </div>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    imgUrl: PropTypes.string,
    name: PropTypes.string,
    show: PropTypes.string
  }),
  selected: PropTypes.bool
};

export default Person;
