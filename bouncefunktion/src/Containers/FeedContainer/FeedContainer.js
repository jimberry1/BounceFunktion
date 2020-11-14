import React, { useState, useEffect } from 'react';
import './FeedContainer.css';
import db from '../../firebase';
import Post from '../../Components/Post/Post';
import PostFilter from '../../Components/Post/PostFilter/PostFilter';
import { useStateValue } from '../../Store/StateProvider';
import { Spinner } from 'react-bootstrap';
import './FeedContainer.css';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';

const FeedContainer = (props) => {
  const [{ idToken }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [numberOfPostsToLoad, setNumberOfPostsToLoad] = useState(10);
  const [likedPosts, setLikedPosts] = useState(null);
  const [favPosts, setFavPosts] = useState(null);
  const [genreFilter, setGenreFilter] = useState('');
  const [postDateFilter, setPostDateFilter] = useState('');

  // Gets all the posts and maps them to Posts state
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .limit(numberOfPostsToLoad)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, [numberOfPostsToLoad]);

  // This useEffect logic checks to see if the user has liked a post by returning the array of their likes.
  useEffect(() => {
    console.log('idToken= ' + idToken);
    if (idToken) {
      var docRef = db.collection('users').doc(idToken);

      docRef
        .get()
        .then(function (doc) {
          let likedPosts = [];
          let favPosts = [];
          if (doc.exists) {
            likedPosts = doc.data().likedPosts;
            favPosts = doc.data().favPosts;
            console.log('favposts' + favPosts);
          } else {
            console.log('No such document!');
          }
          setLikedPosts(likedPosts);
          setFavPosts(favPosts);
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
  }, [idToken]);

  const filterChangedHandler = (event) => {
    console.log("I've been triggered");
    console.log(event.target.value);
    setGenreFilter(event.target.value);

    // TODO This about turning this off when lots of different genres start getting added
    setNumberOfPostsToLoad(100);
  };

  const postDateFilterChangedHandler = (event) => {
    setPostDateFilter(event.target.value);
  };

  // This function is used to filter posts by the selected choices
  const filterFunktion = (postsToFilter) => {
    let filteredPosts = postsToFilter;

    if (genreFilter === '' && postDateFilter === '') {
      return posts;
    }
    if (genreFilter !== '') {
      filteredPosts = postsToFilter.filter((post) =>
        post.data.tags.includes(genreFilter)
      );
    }
    if (postDateFilter !== '') {
      // Add logic for filtering via timestamp here
    }
    return filteredPosts;
  };

  let postsFeed = <Spinner animation="border" variant="danger" />;

  if (likedPosts && favPosts) {
    const filteredPosts = filterFunktion(posts);

    // If the array filters to nothing, i.e no posts to render
    if (!filteredPosts[0]) {
      postsFeed = (
        <div className="feedContainer__noPostsFoundContainer">
          <p>
            I'm sorry, no posts could be found matching your search criteria
          </p>
        </div>
      );
    } else {
      postsFeed = filteredPosts.map((post) => {
        let postHasBeenLiked = false;
        if (likedPosts.includes(post.id)) {
          postHasBeenLiked = true;
        }
        let postHasBeenFavourited = false;
        let urlForComparison = post.data.musicLink;
        if (urlForComparison.includes('spotify')) {
          urlForComparison = urlForComparison.replace(
            'spotify.com/',
            'spotify.com/embed/'
          );
        }
        if (favPosts.includes(urlForComparison)) {
          postHasBeenFavourited = true;
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
            postIsFavourite={postHasBeenFavourited}
          />
        );
      });
    }
  }

  let seeMorePostsButton = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <BlueButton clicked={() => setNumberOfPostsToLoad(100)}>
        See more
      </BlueButton>
    </div>
  );

  if (numberOfPostsToLoad > 10) {
    seeMorePostsButton = null;
  }

  return (
    <div>
      {/* <PostFilter className="feedContainer__filter" /> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // height: '1000px',
          // maxHeight: '1000px',
          // maxWidth: '90%',
          margin: 'auto',
          overflowY: 'scroll',
          paddingBottom: '100px',
        }}
      >
        <div className="feedContainer__filter">
          <PostFilter
            filterValue={genreFilter}
            filterChanged={(event) => filterChangedHandler(event)}
            postDateFilterChanged={(event) =>
              postDateFilterChangedHandler(event)
            }
            postDateFilterValue={postDateFilter}
          />
        </div>
        {postsFeed}
      </div>
      {seeMorePostsButton}
    </div>
  );
};

export default FeedContainer;
