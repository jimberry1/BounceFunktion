import './FavouriteTrack.css';

const FavouriteTrack = (props) => {
  return (
    <div className="favouriteTrack__container">
      <p>Track code:</p>
      <p>{props.musicURL}</p>
    </div>
  );
};

export default FavouriteTrack;
