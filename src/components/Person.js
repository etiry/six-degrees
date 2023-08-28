import { getConnections } from './options/optionsSlice';
import { useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import { incrementCurrentDegree, updateDegree } from './gameStatus/gameStatusSlice';

export default function Person ({ person }) {
  const dispatch = useDispatch();

  const handleSelectionClick = () => {
    dispatch(updateDegree(person));
    dispatch(getConnections(person.id));
    dispatch(incrementCurrentDegree());
  };

  return (
    <Col className="mb-5">
      <div className="avatar-big text-center m-2" onClick={handleSelectionClick}>
        <Image src={person.imgUrl} className="avatar-img rounded-circle" />
        <p>{person.name}</p>
        <p>{person.previousCommonShow}</p>
      </div>
    </Col>
  )
}