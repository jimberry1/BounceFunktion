import React, { useState, useEffect } from 'react';
import db from '../../../firebase';
import firebase from 'firebase';
import './PostCreator.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../../Store/StateProvider';
import { ImPriceTag } from 'react-icons/im';
import { Container, Row, Col } from 'react-bootstrap';
import GenreTag from './GenreTag/GenreTag';
import MaterialUIModal from '../../../UI/Modal/MaterialUIModal';

const PostCreator = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [technoTag, setTechnoTag] = useState(false);
  const [HouseTag, setHouseTag] = useState(false);
  const [DiscoTag, setDiscoTag] = useState(false);
  const [FunkTag, setFunkTag] = useState(false);
  const [dnbTag, setDnbTag] = useState(false);
  const [rapTag, setRapTag] = useState(false);
  const [electronicTag, setElectronicTag] = useState(false);
  const [alternativeTag, setAlternativeTag] = useState(false);
  const [indieTag, setIndieTag] = useState(false);
  const [postUrls, setPostUrls] = useState([]);
  const [openMusicLinkModal, setOpenMusicLinkModal] = useState(false);

  useEffect(() => {
    db.collection('configuration')
      .doc('postUrls')
      .get()
      .then(function (snapshot) {
        if (snapshot.exists) {
          // console.log(snapshot.data().urls);
          setPostUrls(snapshot.data().urls);
        } else {
          console.log('Post url array did not exist');
        }
      });
  }, []);

  const openModalHandler = () => {
    setOpenMusicLinkModal(true);
  };

  const closeModalHandler = () => {
    setOpenMusicLinkModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (musicUrl === '' && input === '') {
      return;
    }

    if (postUrls.includes(musicUrl)) {
      openModalHandler();
      return;
    }

    let genreTags = [];

    if (technoTag) {
      genreTags.push('Techno');
    }
    if (HouseTag) {
      genreTags.push('House');
    }
    if (DiscoTag) {
      genreTags.push('Disco');
    }
    if (FunkTag) {
      genreTags.push('Funk');
    }
    if (dnbTag) {
      genreTags.push('DnB');
    }
    if (electronicTag) {
      genreTags.push('Electronic');
    }
    if (rapTag) {
      genreTags.push('Rap');
    }
    if (alternativeTag) {
      genreTags.push('Alternative');
    }
    if (indieTag) {
      genreTags.push('Indie');
    }

    db.collection('posts').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      musicLink: musicUrl,
      likes: 0,
      commentNumber: 0,
      tags: genreTags,
      // uid: user.uid,
    });

    const configurationRef = db.collection('configuration').doc('postUrls');
    configurationRef.get().then(function (doc) {
      if (doc.exists) {
        const urlArray = doc.data().urls;
        urlArray.push(musicUrl);
        configurationRef.set({ urls: urlArray }, { merge: true });
      } else {
        console.log('Unable to retrieve postUrls');
      }
    });

    setInput('');
    setMusicUrl('');
    setDiscoTag(false);
    setTechnoTag(false);
    setHouseTag(false);
    setFunkTag(false);
    setDnbTag(false);
    setElectronicTag(false);
    setRapTag(false);
    setAlternativeTag(false);
    setIndieTag(false);
  };

  // This was used when I tried to implement tags an array, unfortunately it didn't work as well as I had hoped
  const addTagHandler = (tag) => {
    console.log('addTagHandler invoked with ' + tag);
    console.log('is it contained? =' + tags.includes(tag));
    if (tags.includes(tag)) {
      const updatedTags = tags.filter((t) => t !== tag);
      console.log(updatedTags);

      setTags(updatedTags);
      return;
    } else {
      const updatedTags = tags;
      if (!updatedTags) {
        updatedTags = [];
      }
      updatedTags.push(tag);
      setTags(updatedTags);
    }
  };

  return (
    <div className="messageSender">
      <MaterialUIModal
        open={openMusicLinkModal}
        openModal={openModalHandler}
        closeModal={closeModalHandler}
        musicLink={musicUrl}
        modalTitle="The following URL has already been posted"
      />
      <div className="messageSender__top">
        <div className="messageSender__avatarHolder">
          <Avatar src={user.photoURL} />
        </div>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender__input"
            placeholder={`Hi ${user.displayName} - What would you like to share?`}
          />
          <input
            value={musicUrl}
            onChange={(e) => setMusicUrl(e.target.value)}
            className="messageSender__input"
            placeholder="Paste the music link here"
          />
          <button
            className="postButton-hover postButton"
            onClick={handleSubmit}
            type="submit"
            style={{ margin: 'auto' }}
          >
            Post
          </button>
        </form>
      </div>

      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <div className="messageSender__tagContainer">
            {/* This is a sloppy solution used to fix a problem with styling on mobile devices */}
            <Container className="messageSender__emptyContainer">
              <Row>
                <Col></Col>
              </Row>
            </Container>
            <div className="messageSender__tagsTag">
              {' '}
              <ImPriceTag style={{ color: 'blue' }} />
            </div>

            <h3
              style={{
                padding: '0 10px',
                marginLeft: '15px',
                position: 'relative',
              }}
            >
              Tags
            </h3>
            {/* Could definitely map this from a data array instead */}
            <GenreTag
              clicked={() => setTechnoTag((curVal) => !curVal)}
              genreSelected={technoTag}
              genre="Techno"
            />
            <GenreTag
              clicked={() => setHouseTag((curVal) => !curVal)}
              genreSelected={HouseTag}
              genre="House"
            />
            <GenreTag
              clicked={() => setDiscoTag((curVal) => !curVal)}
              genreSelected={DiscoTag}
              genre="Disco"
            />
            <GenreTag
              clicked={() => setFunkTag((curVal) => !curVal)}
              genreSelected={FunkTag}
              genre="Funk"
            />
            <GenreTag
              clicked={() => setDnbTag((curVal) => !curVal)}
              genreSelected={dnbTag}
              genre="DnB"
            />
            <GenreTag
              clicked={() => setRapTag((curVal) => !curVal)}
              genreSelected={rapTag}
              genre="Rap"
            />
            <GenreTag
              clicked={() => setIndieTag((curVal) => !curVal)}
              genreSelected={indieTag}
              genre="Indie"
            />
            <GenreTag
              clicked={() => setAlternativeTag((curVal) => !curVal)}
              genreSelected={alternativeTag}
              genre="Alternative"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
