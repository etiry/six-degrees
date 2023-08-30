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

export default function Person({ person, selected }) {
  const dispatch = useDispatch();
  const currentDegree = useSelector(
    (state) => state.gameStatus.currentDegreeIndex
  );
  const target = useSelector(
    (state) =>
      state.gameStatus.selections[state.gameStatus.selections.length - 1]
  );

  const checkWinner = (selectedPerson, targetPerson) =>
    selectedPerson.id === targetPerson.id;

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
}

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    imgUrl: PropTypes.string,
    name: PropTypes.string,
    show: PropTypes.string
  }),
  selected: PropTypes.bool
};
