import './FavouriteTracksContainer.css';
import { useState, useEffect } from 'react';
import db from '../../../firebase';
import { useStateValue } from '../../../Store/StateProvider';
import { Spinner } from 'react-bootstrap';
import FavouriteTrack from '../../../Components/Profile/FavouriteTrack/FavouriteTrack';
const FavouriteTracksContainer = (props) => {
  const [favTracks, setFavTracks] = useState([]);
  const [{ idToken }, dispatch] = useStateValue();

  useEffect(() => {
    if (idToken) {
      const favPostRef = db.collection('users').doc(idToken);

      favPostRef.get().then(function (doc) {
        if (doc.exists) {
          const favPosts = doc.data().favPosts;
          setFavTracks(favPosts);
        }
      });
    }
  }, [idToken]);

  let favouritePostsDisplay = <Spinner />;

  if (favTracks[0]) {
    favouritePostsDisplay = favTracks.map((post) => {
      return <FavouriteTrack key={post} musicURL={post} />;
    });
  }

  return (
    <div className="favouriteTracks__container">
      <div className="favouriteTracks__title">
        <p>Favourite Tracks</p>
      </div>

      {favouritePostsDisplay}
    </div>
  );
};

export default FavouriteTracksContainer;
