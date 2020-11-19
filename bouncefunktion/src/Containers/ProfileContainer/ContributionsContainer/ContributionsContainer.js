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
  const [numberOfContributions, setNumberOfContributions] = useState(4);

  useEffect(() => {
    if (user) {
      console.log('user= ' + user.displayName);
      const postsRef = db
        .collection('posts')
        .where('username', '==', user.displayName)
        .orderBy('timestamp', 'desc')
        .limit(numberOfContributions)
        .get()
        .then(function (snapshot) {
          setContributions(
            snapshot.docs.map((post) => ({
              id: post.id,
              musicLink: post.data().musicLink,
            }))
          );
        });
    }
  }, [user, numberOfContributions]);

  let contributionsArray = <Spinner />;

  if (contributions[0]) {
    contributionsArray = contributions.map((contribution) => {
      let musicUrl = contribution.musicLink;

      if (musicUrl.includes('spotify')) {
        musicUrl = musicUrl.replace('spotify.com/', 'spotify.com/embed/');
      }

      return <FavouriteTrack key={contribution.id} musicURL={musicUrl} />;
    });
  }

  let button = (
    <BlueButton
      clicked={() => setNumberOfContributions(100)}
      style={{
        margin: 'auto',
        padding: '25px',
      }}
    >
      See more
    </BlueButton>
  );

  if (numberOfContributions > 4 || contributions.length < 4) {
    button = null;
  }

  return (
    <div className="contributionsContainer__container">
      <div className="contributionsContainer__title">
        <p>Funktion Contributions</p>
      </div>

      {contributionsArray}
      {button}
    </div>
  );
};

export default ContributionsContainer;
