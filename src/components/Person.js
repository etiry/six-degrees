import { getConnections } from './options/optionsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { incrementCurrentDegree, updateDegree } from './gameStatus/gameStatusSlice';

export default function Person ({ person }) {
  const dispatch = useDispatch();
  const currentSelections = useSelector(state => state.gameStatus.selections);
  const currentDegree = useSelector(state => state.gameStatus.currentDegreeIndex);

  const handleSelectionClick = () => {
    if (currentDegree < 5) {
      dispatch(updateDegree(person));
      dispatch(getConnections(person.id, currentSelections));
      dispatch(incrementCurrentDegree());
    }
  };

  return (
    <div className="avatar-big text-center" onClick={handleSelectionClick}>
      <Image src={person.imgUrl} className="avatar-img rounded-circle" />
      <p className="person-name">{person.name}</p>
    </div>
  )
}