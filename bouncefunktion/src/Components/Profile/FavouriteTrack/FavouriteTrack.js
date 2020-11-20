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
          style={{ margin: 'auto' }}
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
            flex: '1',
          }}
        >
          <p style={{ maxWidth: '300px', margin: 'auto' }}>{props.musicURL}</p>
        </div>
      </div>
    );
  }
};

export default FavouriteTrack;
