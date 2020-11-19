import './FavouriteTrack.css';
import { Spinner } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { Col, Row, Container } from 'react-bootstrap';
const FavouriteTrack = (props) => {
  let trackFrame = <Spinner />;
  if (props.musicURL && props.musicURL.includes('spotify')) {
    return (
      <div className="favouriteTrack__container">
        <iframe
          src={props.musicURL}
          width="90%"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          // style={{ marginBottom: '25px' }}
        ></iframe>
      </div>
    );
  } else if (ReactPlayer.canPlay(props.musicURL)) {
    return (
      <div className="favouriteTrack__container">
        <ReactPlayer
          url={props.musicURL}
          height="80px"
          width="90%"
          style={{ margin: 'auto' }}
          // style={{ marginBottom: '25px' }}
        />
      </div>
    );
  } else {
    return (
      <div className="favouriteTrack__container">
        <div
          style={{
            color: 'black',
            fontSize: '15px',
            height: '100%',
            wordWrap: 'break-word',
          }}
        >
          <p>{props.musicURL}</p>
        </div>
      </div>
    );
  }
};

export default FavouriteTrack;
