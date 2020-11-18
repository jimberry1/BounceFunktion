import ReactPlayer from 'react-player';

const PostMusicPlayer = (props) => {
  if (ReactPlayer.canPlay(props.musicLink)) {
    return (
      <ReactPlayer
        url={props.musicLink}
        height="150px"
        width="90%"
        style={{ marginBottom: '25px' }}
      />
    );
  } else if (props.musicLink && props.musicLink.includes('spotify')) {
    return (
      <iframe
        src={props.musicLink.replace('spotify.com/', 'spotify.com/embed/')}
        width="90%"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        style={{ marginBottom: '25px' }}
      ></iframe>
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
