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

const PostCreator = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [tags, setTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (musicUrl === '' || input === '') {
      return;
    }

    db.collection('posts').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      musicLink: musicUrl,
      likes: 0,
      commentNumber: 0,
    });

    setInput('');
    setMusicUrl('');
  };

  const alert = () => {
    console.log('alert triggered');
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
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
            placeholder="Paste the Spotify (Soundcloud coming soon) link here"
          />
          <button onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>

      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <ImPriceTag style={{ color: 'blue' }} />
          <h3 style={{ padding: '0 10px' }}>Tags</h3>
          <div className="messageSender__tagContainer">
            <div className="messageSender__tags">
              <button>Techno</button>
            </div>
            <div className="messageSender__tags">
              <button>Disco</button>
            </div>
            <div className="messageSender__tags">
              <button>Funk</button>
            </div>
            <div className="messageSender__tags">
              <button>Other</button>
            </div>
          </div>
        </div>

        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: 'green' }} />
          <h3>Photo/Video</h3>
        </div>
        {/* <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: 'orange' }} />
          <h3>Feeling/Activity</h3>
        </div> */}
      </div>
    </div>
  );
};

export default PostCreator;
