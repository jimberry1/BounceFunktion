import { useState } from 'react';
import ReactPlayer from 'react-player';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const PostMusicPlayer = (props) => {
  const [ready, setReady] = useState(false);
  if (ReactPlayer.canPlay(props.musicLink)) {
    return (
      <div style={{ width: '100%' }}>
        <ReactPlayer
          url={props.musicLink}
          height="150px"
          width="100%"
          style={{
            marginBottom: '25px',
            display: ready ? '' : 'none',
          }}
          onReady={() => setReady(true)}
        />
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          style={{ display: ready ? 'none' : '' }}
        />
      </div>
    );
  } else if (props.musicLink && props.musicLink.includes('spotify')) {
    return (
      <div style={{ width: '100%' }}>
        <iframe
          src={props.musicLink.replace('spotify.com/', 'spotify.com/embed/')}
          width="100%"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          style={{ marginBottom: '25px', display: ready ? '' : 'none' }}
          onLoad={() => setReady(true)}
        ></iframe>
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          style={{ display: ready ? 'none' : '' }}
        />
      </div>
    );
  } else if (props.musicLink && props.musicLink.includes('bandcamp')) {
    return (
      <div style={{ width: '100%' }}>
        <iframe
          style={{
            border: '0',
            width: '100%',
            display: 'flex',
            height: '120px',
            marginBottom: '25px',
            display: ready ? '' : 'none',
          }}
          onLoad={() => setReady(true)}
          src={
            props.musicLink +
            '/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/artwork=small/transparent=true/'
          }
          seamless
        ></iframe>
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          style={{ display: ready ? 'none' : '' }}
        />
      </div>
    );
  } else {
    return (
      <div style={{ width: '100%', color: 'black' }}>
        <p style={{ wordWrap: 'break-word' }}>{props.musicLink}</p>
      </div>
    );
  }
};

export default PostMusicPlayer;
