import { getConnections } from './options/optionsSlice';
import { useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

export default function Person ({ person }) {
  const dispatch = useDispatch();

  const handleSelectionClick = () => {
    dispatch(getConnections(person.id));
  };

  return (
    <Col>
      <div className="avatar-big text-center m-2" onClick={handleSelectionClick}>
        <Image src={person.imgUrl} className="avatar-img rounded-circle" />
        <p>{person.name}</p>
      </div>
    </Col>
  )
}