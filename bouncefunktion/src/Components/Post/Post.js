import { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { ExpandMoreOutlined } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Iframe from 'react-iframe';
import './Post.css';
import ReactPlayer from 'react-player';
import db from '../../firebase';
import firebase from 'firebase';
import PostComments from './PostComments/PostComments';

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
}) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(postIsLiked);
  const [openComments, setOpenComments] = useState(false);

  useEffect(() => {
    setLikes(totalLikes);
  }, [totalLikes]);

  let musicWidgetDefaultSpotify = (
    <Spinner animation="border" variant="danger" />
  );

  if (musicLink && musicLink.includes('spotify')) {
    musicLink = musicLink.replace(
      'spotify.com/track',
      'spotify.com/embed/track'
    );
    musicWidgetDefaultSpotify = (
      <iframe
        src={musicLink}
        width="300"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        style={{ marginBottom: '25px' }}
      ></iframe>
    );
  } else if (musicLink) {
    musicWidgetDefaultSpotify = (
      <ReactPlayer
        url={musicLink}
        height="150px"
        width="300px"
        style={{ marginBottom: '25px' }}
      />
    );
  }

  const openCommentsHandler = () => {
    console.log('open comments was previously set to = ' + openComments);
    setOpenComments((current) => !current);
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
        {/* //   <div className="post__option" onClick={() => likeButtonClicked(true)}> */}
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
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <Container>
        <Row>
          <Col>
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
      </Container>

      <div className="post__options">
        <div className="post__option" style={{ flex: 0 }}>
          <p>
            <strong>{likes}</strong>
          </p>
        </div>
        {thumbIcon}
        <div className="post__option" onClick={openCommentsHandler}>
          <p>
            <strong style={{ padding: '10px' }}>{commentNumber}</strong>
          </p>
          <ChatBubbleOutlineIcon />
          <p>Comments</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircleIcon />
          <ExpandMoreOutlined />
        </div>
      </div>
      {postComments}
    </div>
  );
};

export default Post;
