/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { getConnections } from '../slices/optionsSlice';
import {
  incrementCurrentDegree,
  updateDegree
} from '../slices/gameStatusSlice';

/**
 * Component for showing image, name, and show for each person.
 * @component
 */

const Person = ({ person, selected }) => {
  const dispatch = useDispatch();

  /**
   * When person is clicked, updates the game status
   * gets connections of selected person.
   */
  const handleSelectionClick = () => {
    dispatch(updateDegree(person));
    dispatch(getConnections(person.id));
    dispatch(incrementCurrentDegree());
  };

  if (selected) {
    return (
      <div className="avatar-big text-center">
        <Image src={person.imgUrl} className="avatar-img rounded-circle" />
        <p className="person-name">{person.name}</p>
        <p className="show-name">{person.commonShow}</p>
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
      <p className="show-name">{person.commonShow}</p>
    </div>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    imgUrl: PropTypes.string,
    name: PropTypes.string,
    commonShow: PropTypes.string
  }),
  selected: PropTypes.bool
};

export default Person;
