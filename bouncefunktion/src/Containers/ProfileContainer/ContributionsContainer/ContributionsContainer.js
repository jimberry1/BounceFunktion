import './ContributionsContainer.css';
import { useState, useEffect } from 'react';
import BlueButton from '../../../UI/Modal/Buttons/BlueButton/BlueButton';
import db from '../../../firebase';
import { useStateValue } from '../../../Store/StateProvider';
import { Spinner } from 'react-bootstrap';
import FavouriteTrack from '../../../Components/Profile/FavouriteTrack/FavouriteTrack';

const ContributionsContainer = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (user) {
      console.log('user= ' + user.displayName);
      const postsRef = db
        .collection('posts')
        .where('username', '==', user.displayName)
        .onSnapshot((snapshot) => {
          setContributions(
            snapshot.docs.map((post) => ({
              id: post.id,
              musicLink: post.data().musicLink,
            }))
          );
        });
    }
  }, [user]);

  let contributionsArray = <Spinner />;

  if (contributions[0]) {
    contributionsArray = contributions.map((contribution) => {
      let musicUrl = contribution.musicLink;
      console.log('Contributions musicUrl = ' + musicUrl);

      if (musicUrl.includes('spotify')) {
        musicUrl = musicUrl.replace(
          'spotify.com/track',
          'spotify.com/embed/track'
        );
      }

      return <FavouriteTrack key={contribution.id} musicURL={musicUrl} />;
    });
  }

  return (
    <div className="contributionsContainer__container">
      <div className="contributionsContainer__title">
        <p>Funktion Contributions</p>
      </div>

      {contributionsArray}
    </div>
  );
};

export default ContributionsContainer;
