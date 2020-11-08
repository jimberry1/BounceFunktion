import './BounceFunktionPlaylist.css';
const BounceFunktionPlaylist = (props) => {
  return (
    <div className="BounceFunktionPlaylist__container">
      <p className="BounceFunktionPlaylist__title">Feel the Funk</p>
      <div className="BounceFunktionPlaylist__playlist">
        <iframe
          src="https://open.spotify.com/embed/playlist/5QDnn5CRDGKRMiFwcqfSGx"
          width="90%"
          height="280"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
    </div>
  );
};

export default BounceFunktionPlaylist;
