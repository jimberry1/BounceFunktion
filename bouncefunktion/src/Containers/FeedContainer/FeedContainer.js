import React, { useState, useEffect } from 'react';
import './FeedContainer.css';
import db from '../../firebase';
import Post from '../../Components/Post/Post';
import PostFilter from '../../Components/Post/PostFilter/PostFilter';
import { useStateValue } from '../../Store/StateProvider';
import { Spinner } from 'react-bootstrap';

const FeedContainer = (props) => {
  const [{ idToken }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(null);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  // This useEffect logic checks to see if the user has liked a post by returning the array of their likes.
  useEffect(() => {
    console.log('idToken= ' + idToken);
    if (idToken) {
      var docRef = db.collection('users').doc(idToken.substring(0, 10));

      docRef
        .get()
        .then(function (doc) {
          let likedPosts = [];
          if (doc.exists) {
            likedPosts = doc.data().likedPosts;
          } else {
            console.log('No such document!');
          }
          setLikedPosts(likedPosts);
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
  }, [idToken]);

  let postsFeed = <Spinner animation="border" variant="danger" />;

  if (likedPosts) {
    console.log(likedPosts);
    postsFeed = posts.map((post) => {
      let postHasBeenLiked = false;
      if (likedPosts.includes(post.id)) {
        console.log("we're in the true bit now");
        postHasBeenLiked = true;
      }
      return (
        <Post
          key={post.id}
          postID={post.id}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
          musicLink={post.data.musicLink}
          postIsLiked={postHasBeenLiked}
          totalLikes={post.data.likes}
          idToken={idToken}
        />
      );
    });
  }

  return (
    <div>
      <PostFilter />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '1000px',
          overflow: 'auto',
        }}
      >
        {postsFeed}
      </div>
    </div>
  );
};

export default FeedContainer;
