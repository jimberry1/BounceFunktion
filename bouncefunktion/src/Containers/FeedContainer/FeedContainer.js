import React, { useState, useEffect } from 'react';
import './FeedContainer.css';
import db from '../../firebase';
import Post from '../../Components/Post/Post';
import PostFilter from '../../Components/Post/PostFilter/PostFilter';
import { useStateValue } from '../../Store/StateProvider';
import { Spinner } from 'react-bootstrap';
import './FeedContainer.css';

const FeedContainer = (props) => {
  const [{ idToken }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(null);
  const [genreFilter, setGenreFilter] = useState('');

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
      var docRef = db.collection('users').doc(idToken);

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

  const filterChangedHandler = (event) => {
    console.log(event.target.value);
    setGenreFilter(event.target.value);
  };

  const filterFunktion = (postsToFilter) => {
    let filteredPosts = postsToFilter;

    if (genreFilter === '') {
      return posts;
    } else {
      filteredPosts = postsToFilter.filter((post) =>
        post.data.tags.includes(genreFilter)
      );
    }
    return filteredPosts;
  };

  let postsFeed = <Spinner animation="border" variant="danger" />;

  if (likedPosts) {
    console.log(likedPosts);
    // console.log(posts.filter(filterFunktion()));
    const filteredPosts = filterFunktion(posts);
    postsFeed = filteredPosts.map((post) => {
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
          commentNumber={post.data.commentNumber}
        />
      );
    });
  }

  return (
    <div>
      {/* <PostFilter className="feedContainer__filter" /> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '1000px',
          maxHeight: '1000px',
          overflow: 'auto',
          paddingBottom: '100px',
        }}
      >
        <div className="feedContainer__filter">
          <PostFilter
            filterValue={genreFilter}
            filterChanged={(event) => filterChangedHandler(event)}
          />
        </div>
        {postsFeed}
      </div>
    </div>
  );
};

export default FeedContainer;
