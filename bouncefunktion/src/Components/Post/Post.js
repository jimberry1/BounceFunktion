import { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import './Post.css';
import ReactPlayer from 'react-player';
import db from '../../firebase';
import firebase from 'firebase';
import PostComments from './PostComments/PostComments';
import MaterialUIModal from '../../UI/Modal/MaterialUIModal';
import StarIcon from '@material-ui/icons/Star';
import { AiFillStar } from 'react-icons/ai';
import PostMusicPlayer from './PostMusicPlayer/PostMusicPlayer';
import UseAnimations from 'react-useanimations';
import star from 'react-useanimations/lib/star';
import { IconContext } from 'react-icons';

const Post = ({
  postID,
  profilePic,
  musicLink,
  username,
  timestamp,
  message,
  postIsLiked,
  totalLikes,
  idToken,
  commentNumber,
  postIsFavourite,
  theme,
}) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(postIsLiked);
  const [favPost, setFavPost] = useState(postIsFavourite);
  const [openComments, setOpenComments] = useState(false);
  const [openMusicLinkModal, setOpenMusicLinkModal] = useState(false);

  useEffect(() => {
    setLikes(totalLikes);
  }, [totalLikes]);

  useEffect(() => {
    setFavPost(postIsFavourite);
  }, [postIsFavourite]);

  let musicWidgetDefaultSpotify = (
    <Spinner animation="border" variant="danger" />
  );

  if (musicLink) {
    musicWidgetDefaultSpotify = <PostMusicPlayer musicLink={musicLink} />;
  }

  const openModalHandler = () => {
    setOpenMusicLinkModal(true);
  };

  const closeModalHandler = () => {
    setOpenMusicLinkModal(false);
  };

  const openCommentsHandler = () => {
    setOpenComments((current) => !current);
  };

  const favouritePostHandler = () => {
    var userFavRef = db.collection('users').doc(idToken);

    if (favPost) {
      var userFavRef = db.collection('users').doc(idToken);
      if (favPost) {
        userFavRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              let favPosts = doc.data().favPosts;
              favPosts = favPosts.filter((post) => post !== musicLink);
              userFavRef.set({ favPosts: favPosts }, { merge: true });
            } else {
              console.log('No such document!');
            }
          })
          .catch(function (error) {
            console.log('Error getting document:', error);
          });
      }
    } else {
      userFavRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const favPosts = doc.data().favPosts;
            favPosts.push(musicLink);
            userFavRef.set({ favPosts: favPosts }, { merge: true });
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }

    setFavPost(!favPost);
  };

  const likeButtonClickedHandler = () => {
    var usersLikeRef = db.collection('users').doc(idToken);
    var postRef = db.collection('posts').doc(postID);
    if (liked) {
      //Get the value for the users liked post
      usersLikeRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let likedPosts = doc.data().likedPosts;
            likedPosts = likedPosts.filter((post) => post !== postID);
            usersLikeRef.set({ likedPosts: likedPosts }, { merge: true });
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });

      //Now update the number of likes on the post
      postRef.set(
        { likes: firebase.firestore.FieldValue.increment(-1) },
        { merge: true }
      );

      setLikes((likes) => likes - 1);
    } else {
      usersLikeRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const likedPosts = doc.data().likedPosts;
            likedPosts.push(postID);
            usersLikeRef.set({ likedPosts: likedPosts }, { merge: true });
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });

      postRef.set(
        { likes: firebase.firestore.FieldValue.increment(+1) },
        { merge: true }
      );
      setLikes((likes) => likes + 1);
    }

    setLiked(!liked);
  };

  let thumbIcon = (
    <div className="post__option" onClick={likeButtonClickedHandler}>
      <ThumbUpIcon />
      <p>Like</p>
    </div>
  );

  if (liked) {
    thumbIcon = (
      <div className="post__option" onClick={likeButtonClickedHandler}>
        <ThumbUpIcon color="primary" />
        <p style={{ color: 'blue' }}>Liked</p>
      </div>
    );
  }

  let postComments = null;

  if (openComments) {
    postComments = <PostComments postID={postID} />;
  }

  return (
    <div
      className="post"
      style={{ border: theme === 'light' ? '1px solid black' : 'none' }}
    >
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>
            <strong>{username}</strong>
          </h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      {/* <Container fluid className="post__bodyContainerText">
        <Row>
          <Col
            style={{
              alignItems: 'left',
              display: message ? '' : 'none',
            }}
          >
            <div className="post__bottom">
              <p>{message}</p>
            </div>
          </Col>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {musicWidgetDefaultSpotify}
          </Col>
        </Row>
      </Container> */}
      <div className="post__bodyContainerContainer">
        <div
          className="post__bodyContainerMessageContainer"
          style={{ display: message ? '' : 'none', }}
        >
          <div className="post__bottom">
            <p>{message}</p>
          </div>
        </div>
        <div className="post__bodyContainerMusicContainer" style={{paddingLeft: message ? "" : "45px", paddingRight: message ? "" : "45px"}}>
          {musicWidgetDefaultSpotify}
        </div>
      </div>
      <MaterialUIModal
        open={openMusicLinkModal}
        openModal={openModalHandler}
        closeModal={closeModalHandler}
        musicLink={musicLink}
        modalTitle="Music Link"
      />

      <div className="post__options">
        {/* This is a workaround used to stop the like button being hidden for small screens, it's a really messy solution but the best I could come up with for now */}
        <Container className="post__emptyContainer">
          <Row>
            <Col></Col>
          </Row>
        </Container>
        <div className="post__option">
          <p>
            <strong>{likes}</strong>
          </p>
        </div>
        <div className="post__option" style={{ flex: 1 }}>
          {thumbIcon}
        </div>
        <div className="post__option" onClick={openCommentsHandler}>
          <p>
            <strong style={{ padding: '10px' }}>{commentNumber}</strong>
          </p>
          <ChatBubbleOutlineIcon />
          <p>Comments</p>
        </div>
        <div
          className="post__option"
          onClick={favouritePostHandler}
          style={{ padding: '10px' }}
        >
          {favPost ? (
            <AiFillStar color="gold" size={32} />
          ) : (
            <StarIcon size={32} />
          )}
        </div>
        <div className="post__option" onClick={openModalHandler}>
          <NearMeIcon />
          <p>Share</p>
        </div>
      </div>
      {postComments}
    </div>
  );
};

export default Post;
