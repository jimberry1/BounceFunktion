import React, { useState, useEffect } from 'react';
import db from '../../../firebase';
import firebase from 'firebase';
import './PostCreator.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../../Store/StateProvider';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { ImPriceTag } from 'react-icons/im';
import { Container, Row, Col } from 'react-bootstrap';
import BlueButton from '../../../UI/Modal/Buttons/BlueButton/BlueButton';

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

  console.log('this is tags array=' + tags);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (musicUrl === '' || input === '') {
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

    db.collection('posts').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      musicLink: musicUrl,
      likes: 0,
      commentNumber: 0,
      tags: genreTags,
      uid: user.uid,
    });

    setInput('');
    setMusicUrl('');
    setDiscoTag(false);
    setTechnoTag(false);
    setHouseTag(false);
    setFunkTag(false);
    setDnbTag(false);
  };

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
            <div>
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
            <div className="messageSender__tags">
              <button
                className={
                  technoTag
                    ? 'messageSender__buttonClicked'
                    : 'messageSender__buttonNotClicked'
                }
                onClick={() => setTechnoTag((curVal) => !curVal)}
              >
                Techno
              </button>
            </div>
            <div className="messageSender__tags">
              <button
                className={
                  DiscoTag
                    ? 'messageSender__buttonClicked'
                    : 'messageSender__buttonNotClicked'
                }
                onClick={() => setDiscoTag((curVal) => !curVal)}
              >
                Disco
              </button>
            </div>
            <div className="messageSender__tags">
              <button
                className={
                  FunkTag
                    ? 'messageSender__buttonClicked'
                    : 'messageSender__buttonNotClicked'
                }
                onClick={() => setFunkTag((curVal) => !curVal)}
              >
                Funk
              </button>
            </div>
            <div className="messageSender__tags">
              <button
                className={
                  HouseTag
                    ? 'messageSender__buttonClicked'
                    : 'messageSender__buttonNotClicked'
                }
                onClick={() => setHouseTag((curVal) => !curVal)}
              >
                House
              </button>
            </div>
            <div className="messageSender__tags">
              <button
                className={
                  dnbTag
                    ? 'messageSender__buttonClicked'
                    : 'messageSender__buttonNotClicked'
                }
                onClick={() => setDnbTag((curVal) => !curVal)}
              >
                DnB
              </button>
            </div>
          </div>
        </div>

        {/* <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: 'green' }} />
          <h3>Photo/Video</h3>
        </div> */}
      </div>
    </div>
  );
};

export default PostCreator;
