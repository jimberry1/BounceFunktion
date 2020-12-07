import ReactPlayer from 'react-player';
import { Card, Button } from 'react-bootstrap';
import './MixesCard.css';
/**
 * This component renders the mix card for the mixes page of TBF
 * The card is passed a url, and a player is decided based upon that url to
 * load and play the music
 * @param {
 * musicLink - the url for the mix
 * title - title of mix
 * description - mix description
 * } props
 */
const MixesCard = (props) => {
  const exploreMoreHandler = () => {
    console.log('explore more handler invoked' + props.exploreMoreLink);
    window.open(props.exploreMoreLink, '_blank');
  };

  if (ReactPlayer.canPlay(props.musicLink)) {
    return (
      <Card className="mixesCard__card" style={{ color: 'black' }}>
        <Card.Body style={{ maxWidth: '300px' }}>
          <ReactPlayer
            url={props.musicLink}
            width="300px"
            height="380px"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />

          <Card.Title
            style={{
              padding: '10px',
              color: 'black',
            }}
          >
            {props.title}
          </Card.Title>
          <Card.Text style={{ height: '70px' }}>{props.description}</Card.Text>
          {props.exploreMoreLink ? (
            <Button variant="primary" onClick={exploreMoreHandler}>
              Explore more
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    );
  } else if (props.musicLink && props.musicLink.includes('spotify')) {
    return (
      <Card className="mixesCard__card" style={{ color: 'black' }}>
        <Card.Body style={{ maxWidth: '300px' }}>
          <iframe
            src={props.musicLink.replace('spotify.com/', 'spotify.com/embed/')}
            width="300"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
          <Card.Title
            style={{
              padding: '10px',
              color: 'black',
            }}
          >
            {props.title}
          </Card.Title>
          <Card.Text style={{ height: '70px' }}>{props.description}</Card.Text>
          <Button variant="primary" onClick={exploreMoreHandler}>
            Explore more
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
    // <div style={{ width: '100%', color: 'black' }}>
    //   <p style={{ wordWrap: 'break-word' }}>{props.musicLink}</p>
    // </div>;
  }
};

export default MixesCard;
