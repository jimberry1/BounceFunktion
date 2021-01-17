import './MemberDisplay.css';
import GenreRadialChart from '../../../UI/Charts/GenreRadialChart';
import ContributionsContainer from '../../../Containers/ProfileContainer/ContributionsContainer/ContributionsContainer';
import FavouriteTrack from '../../Profile/FavouriteTrack/FavouriteTrack';
import BlueButton from '../../../UI/Modal/Buttons/BlueButton/BlueButton';
import PostsInformationStatistics from './PostsInformationStatistics/PostsInformationStatistics';
import { Avatar } from '@material-ui/core';

const MemberDisplay = (props) => {
  let contributions = null;
  if (props.userData) {
    contributions = (
      <ContributionsContainer
        nameOfUser={props.userData.name}
        style={{ width: '100%' }}
      />
    );
  }
  let contributionsArray = null;
  if (props.posts && props.posts[0]) {
    contributionsArray = props.posts.map((contribution) => {
      let musicUrl = contribution.data.musicLink;

      if (musicUrl.includes('spotify')) {
        musicUrl = musicUrl.replace('spotify.com/', 'spotify.com/embed/');
      }

      return <FavouriteTrack key={contribution.id} musicURL={musicUrl} />;
    });
  }

  const totalNumberOfLikes = () => {
    let cumNumberOfLikes = 0;
    if (props.posts && props.posts[0]) {
      props.posts.map((post) => {
        cumNumberOfLikes = cumNumberOfLikes + post.data.likes;
      });
    }
    return cumNumberOfLikes;
  };
  return (
    <div>
      <div className="MemberDisplay__avatarContainer">
        <Avatar
          src={props.userData?.photoURL}
          className="MemberDisplay__avatar"
          style={{
            height: '200px',
            width: '200px',
            alignSelf: 'center',
            marginBottom: '10px',
          }}
        />
        <p>{props.userData?.name}</p>
      </div>
      <PostsInformationStatistics
        numberOfPosts={props?.posts?.length}
        totalLikes={props?.userData?.likedPosts?.length}
        totalComments={props.numberOfComments}
        totalLikesReceived={totalNumberOfLikes()}
      />
      <div className="MemberDisplay__chartContainer">
        <div className="MemberDisplay__postInformation">
          <div className="MemberDisplay__FavouriteTracksContainer">
            <div className="contributionsContainer__title">
              <p>Funktion Contributions</p>
            </div>
            {contributionsArray}
          </div>
          {props.posts && !props.posts[0] && 'This user currently has no posts'}
        </div>
        <div className="MemberDisplay__postInformation">
          <h3>Contributions by genre</h3>
          <GenreRadialChart posts={props.posts} />
        </div>
      </div>
      <div className="MemberDisplay__buttonContainer">
        <BlueButton clicked={props.backButtonClicked}>Back</BlueButton>
      </div>
    </div>
  );
};

export default MemberDisplay;
