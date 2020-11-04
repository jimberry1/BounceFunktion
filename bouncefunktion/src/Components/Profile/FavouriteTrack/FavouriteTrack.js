import './FavouriteTrack.css';
import { Spinner } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { Col, Row, Container } from 'react-bootstrap';
const FavouriteTrack = (props) => {
  console.log('musicURL=' + props.musicURL);
  let trackFrame = <Spinner />;
  if (props.musicURL && props.musicURL.includes('spotify')) {
    trackFrame = (
      <iframe
        src={props.musicURL}
        width="90%"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        // style={{ marginBottom: '25px' }}
      ></iframe>
    );
  } else {
    trackFrame = (
      <ReactPlayer
        url={props.musicURL}
        height="80px"
        width="90%"
        style={{ margin: 'auto' }}
        // style={{ marginBottom: '25px' }}
      />
    );
  }

  return <div className="favouriteTrack__container">{trackFrame}</div>;
};

export default FavouriteTrack;
