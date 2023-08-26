import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

export default function Person ({ person }) {
  return (
    <Col>
      <div className="avatar-big text-center m-2">
        <Image src={person.imgUrl} className="avatar-img rounded-circle" />
        <p>{person.name}</p>
      </div>
    </Col>
  )
}