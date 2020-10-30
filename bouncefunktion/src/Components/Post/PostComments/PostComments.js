import { useState, useEffect } from 'react';
import db from '../../../firebase';
import PostComment from './PostComment/PostComment';
import AddComment from './AddComment/AddComment';
import { Unsubscribe } from 'firebase';

const PostComments = ({ postID, profilePic }) => {
  const [comments, setComments] = useState([]);
  // This should render my comments section, this is done by getting comment information by matching comments collection on postID
  // step 1) useEffect to load my comments and add them to state
  useEffect(() => {
    const commentsRef = db
      .collection('comments')
      .where('postId', '==', postID)
      .orderBy('timestamp');

    commentsRef.onSnapshot((snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);

  return (
    <div>
      {comments.map((commentObject) => {
        return (
          <PostComment
            key={commentObject.id}
            poster={commentObject.data.poster}
            message={commentObject.data.message}
            timestamp={commentObject.data.timestamp}
            profilePic={commentObject.data.profilePic}
          />
        );
      })}
      <AddComment postID={postID} />
    </div>
  );
};

export default PostComments;
