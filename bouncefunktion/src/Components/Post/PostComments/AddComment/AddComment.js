import { useState, useEffect } from 'react';
import { useStateValue } from '../../../../Store/StateProvider';
import firebase from 'firebase';
import db from '../../../../firebase';
import './AddComment.css';
import { Avatar } from '@material-ui/core';

const AddComment = (props) => {
  const [input, setInput] = useState('');
  const [{ user }, dispatch] = useStateValue();
  // This component should let the user add a comment to the post.

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === '') {
      return;
    }

    db.collection('comments').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      poster: user.displayName,
      postId: props.postID,
    });

    db.collection('posts')
      .doc(props.postID)
      .set(
        { commentNumber: firebase.firestore.FieldValue.increment(1) },
        { merge: true }
      );

    setInput('');
  };

  return (
    <div className="addComment">
      <div className="addComment__top">
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="addComment__input"
            placeholder="Add comment..."
          />
          <button onClick={handleSubmit} type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComment;
