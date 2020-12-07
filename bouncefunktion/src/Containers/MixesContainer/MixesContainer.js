import { useState, useEffect } from 'react';
import MixesCardsComponent from '../../Components/MixesCardsComponent/MixesCardsComponent';
import { Spinner } from 'react-bootstrap';
import './MixesContainer.css';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';
import AddMixForm from '../../Components/MixesCardsComponent/AddMixForm/AddMixForm';
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../Store/StateProvider';

const MixesContainer = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [mixes, setMixes] = useState(null);
  const [isAddingMix, setIsAddingMix] = useState(false);
  const [newMixTitle, setNewMixTitle] = useState('');
  const [newMixDescription, setNewMixDescription] = useState('');
  const [newMixLink, setNewMixLink] = useState('');
  const [exploreMoreLink, setExploreMoreLink] = useState('');
  const [newMixPosted, setNewMixPosted] = useState(false);

  useEffect(() => {
    const mixesDbRef = db.collection('mixes').orderBy('timestamp', 'desc');

    mixesDbRef.get().then(function (mixes) {
      setMixes(mixes.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, [newMixPosted]);

  const submitNewMixHandler = (event) => {
    event.preventDefault();

    if (newMixTitle !== '' && newMixLink !== '') {
      db.collection('mixes').add({
        title: newMixTitle,
        description: newMixDescription,
        musicLink: newMixLink,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        exploreMoreLink: exploreMoreLink,
        profilePic: user.photoURL,
        username: user.displayName,
      });

      setIsAddingMix(false);
      setNewMixTitle('');
      setNewMixDescription('');
      setNewMixLink('');
      setExploreMoreLink('');
      setNewMixPosted(true);
    }
  };

  const mixTitleChangedHandler = (event) => {
    let newTitle = event.target.value;

    if (newTitle.length > 25) {
      return;
    }
    setNewMixTitle(newTitle);
  };

  const mixDescriptionChangedHandler = (event) => {
    let newDescription = event.target.value;

    if (newDescription.length > 100) {
      return;
    }
    setNewMixDescription(newDescription);
  };

  let mixesComponent = <Spinner animation="border" role="status" />;

  if (mixes) {
    mixesComponent = <MixesCardsComponent theme={props.theme} mixes={mixes} />;
  }

  return (
    <div className="MixesContainer__container">
      {/* <MixesCardsComponent theme={props.theme} /> */}
      {mixesComponent}
      {isAddingMix ? (
        <div style={{ marginTop: '50px' }}>
          <AddMixForm
            title={newMixTitle}
            titleChanged={(event) => mixTitleChangedHandler(event)}
            description={newMixDescription}
            descriptionChanged={(event) => mixDescriptionChangedHandler(event)}
            mixLink={newMixLink}
            mixLinkChanged={(event) => setNewMixLink(event.target.value)}
            submitClicked={(event) => submitNewMixHandler(event)}
            exploreMoreLink={exploreMoreLink}
            exploreMoreLinkChanged={(event) =>
              setExploreMoreLink(event.target.value)
            }
          />
        </div>
      ) : null}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '25px',
        }}
      >
        <BlueButton clicked={() => setIsAddingMix((oldValue) => !oldValue)}>
          {isAddingMix ? 'Minimise' : 'Add Mix'}
        </BlueButton>
      </div>
    </div>
  );
};

export default MixesContainer;
