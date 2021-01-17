import React, { useState, useEffect } from 'react';
import './FeedContainer.css';
import db from '../../firebase';
import Post from '../../Components/Post/Post';
import PostFilter from '../../Components/Post/PostFilter/PostFilter';
import { useStateValue } from '../../Store/StateProvider';
import { Spinner } from 'react-bootstrap';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const FeedContainer = (props) => {
  console.log('Rendering FeedContainer.js');

  const [{ idToken }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(null);
  const [favPosts, setFavPosts] = useState(null);
  const [genreFilter, setGenreFilter] = useState('');
  const [postDateFilter, setPostDateFilter] = useState('');
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [getMorePostsFromFirebase, setGetMorePostsFromFirebase] = useState(0);

  const [allPostsRetrieved, setAllPostsRetrieved] = useState(false);
  const [
    isExistingDataFilteredByTag,
    setIsExistingDataFilteredByTag,
  ] = useState(false);

  // Gets all the posts and maps them to Posts state
  useEffect(() => {
    async function getUnfilteredPostsFromFirebase() {
      let postsDBref = db
        .collection('posts')
        .orderBy('timestamp', 'desc')
        .limit(10);

      if (lastVisibleDoc) {
        postsDBref = postsDBref.startAfter(lastVisibleDoc);
      }

      await postsDBref.get().then((snapshot) => {
        // Helps with pagination
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        setLastVisibleDoc(lastVisible);

        setPosts((posts) =>
          posts.concat(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
        // If the number of posts retrieved is < 10 then set all posts received to true
        setAllPostsRetrieved(snapshot.docs.length < 10);
      });
    }

    async function getFilteredPostsFromFirebase() {
      let postsDbRef = db
        .collection('posts')
        .where('tags', 'array-contains', genreFilter)
        .orderBy('timestamp', 'desc')
        .limit(10);

      if (lastVisibleDoc) {
        postsDbRef = postsDbRef.startAfter(lastVisibleDoc);
      }

      await postsDbRef
        .get()
        .then((collection) => {
          // Helps with pagination
          const lastVisible = collection.docs[collection.docs.length - 1];
          setLastVisibleDoc(lastVisible);
          let allPostsFetched = false;
          if (collection.docs.length < 10) {
            allPostsFetched = true;
          }
          setAllPostsRetrieved(allPostsFetched);

          let updatedPosts;

          // If the data has already been filtered by tag, then add the new post results onto the pre-existing data, else wipe that data only display the new posts
          if (isExistingDataFilteredByTag) {
            updatedPosts = posts.concat(
              collection.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
            );
          } else {
            updatedPosts = collection.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
          }
          setPosts(updatedPosts);
        })
        .catch((err) => console.log(err));
    }

    if (genreFilter == '') {
      // getFirstPostFromFirebaseAndEstablishListener();
      getUnfilteredPostsFromFirebase();
    } else {
      getFilteredPostsFromFirebase();
    }
  }, [getMorePostsFromFirebase, genreFilter]);

  // This useEffect logic checks to see if the user has liked a post by returning the array of their likes.
  useEffect(() => {
    if (idToken) {
      const docRef = db.collection('users').doc(idToken);

      docRef
        .get()
        .then(function (doc) {
          let likedPosts = [];
          let favPosts = [];
          if (doc.exists) {
            likedPosts = doc.data().likedPosts;
            favPosts = doc.data().favPosts;
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
    setLastVisibleDoc(null);
    setPosts([]);
    setGenreFilter(event.target.value);
  };

  const seeMorePostsHandler = () => {
    let isFilteredAlready = true;
    if (genreFilter == '') {
      isFilteredAlready = false;
    }
    setIsExistingDataFilteredByTag(isFilteredAlready);
    setGetMorePostsFromFirebase((curVal) => curVal + 1);
  };

  // TODO get this working with proper date formatting
  const postDateFilterChangedHandler = (event) => {
    setPostDateFilter(event.target.value);
  };

  let postsFeed = (
    <Loader
      type="Grid"
      color="#00BFFF"
      height={280}
      width={100}
      style={{ display: posts[0] ? 'none' : '' }}
    />
  );

  if (likedPosts && favPosts) {
    // If the array filtered contains nothing, inform the user

    if (!posts[0]) {
      postsFeed = (
        <div className="feedContainer__noPostsFoundContainer">
          <SentimentVeryDissatisfiedIcon fontSize="large" />

          <p style={{ color: 'white' }}>
            We're sorry, no posts matching your search criteria could be found
          </p>
        </div>
      );
    } else {
      postsFeed = posts.map((post) => {
        let postHasBeenLiked = false;
        if (likedPosts.includes(post.id)) {
          postHasBeenLiked = true;
        }
        let postHasBeenFavourited = false;
        let urlForComparison = post.data.musicLink;

        // At the moment when we post the link, we don't store it in an embedded way, potentially we should store both the embedded the non-embedded link but for now I am happy to just do this hackery
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
            theme={props.theme}
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
        display: allPostsRetrieved ? 'none' : '',
        cursor: 'pointer',
      }}
    >
      <BlueButton clicked={seeMorePostsHandler}>See more</BlueButton>
    </div>
  );

  return (
    <div
      // For some reason this styling isn't applying from a class???
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        paddingBottom: allPostsRetrieved ? '100px' : '0px',
        overflowAnchor: 'none',
      }}
    >
      <div className="feedContainer__filter">
        <PostFilter
          filterValue={genreFilter}
          filterChanged={(event) => filterChangedHandler(event)}
          postDateFilterChanged={(event) => postDateFilterChangedHandler(event)}
          postDateFilterValue={postDateFilter}
        />
      </div>
      {postsFeed}
      {seeMorePostsButton}
    </div>
  );
};

export default FeedContainer;
