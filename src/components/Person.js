import { getConnections } from './options/optionsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { incrementCurrentDegree, updateDegree } from './gameStatus/gameStatusSlice';

export default function Person ({ person, selected }) {
  const dispatch = useDispatch();
  const currentDegree = useSelector(state => state.gameStatus.currentDegreeIndex);

  const handleSelectionClick = () => {
    if (currentDegree < 5) {
      dispatch(updateDegree(person));
      dispatch(getConnections(person.id));
      dispatch(incrementCurrentDegree());
    }
  };

  if (selected) {
    return (
      <div className="avatar-big text-center">
        <Image src={person.imgUrl} className="avatar-img rounded-circle" />
        <p className="person-name">{person.name}</p>
      </div>      
    )
  }

  return (
    <div className="avatar-big text-center" onClick={handleSelectionClick}>
      <Image src={person.imgUrl} className="avatar-img rounded-circle" />
      <p className="person-name">{person.name}</p>
    </div>
  )
}