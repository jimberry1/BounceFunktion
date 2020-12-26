import './BounceFunktionPlaylist.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useState } from 'react';
const BounceFunktionPlaylist = (props) => {
  const [loaded, setLoaded] = useState(false);

  const playlist = (
    <div className="BounceFunktionPlaylist__playlist">
      <iframe
        src="https://open.spotify.com/embed/playlist/5QDnn5CRDGKRMiFwcqfSGx"
        width="90%"
        height="280"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        style={{ display: loaded ? '' : 'none' }}
        onLoad={() => setLoaded(true)}
      ></iframe>
      <Loader
        type="Grid"
        color="#00BFFF"
        height={280}
        width={100}
        style={{ display: loaded ? 'none' : '' }}
      />
    </div>
  );

  return (
    <div className="BounceFunktionPlaylist__container">
      <p className="BounceFunktionPlaylist__title">Feel the Funk</p>
      {playlist}
    </div>
  );
};

export default BounceFunktionPlaylist;
