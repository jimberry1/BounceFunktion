import './PostsInformationStatistics.css';

const PostsInformationStatistics = ({
  numberOfPosts,
  totalLikes,
  totalComments,
  totalLikesReceived,
}) => {
  return (
    <div className="PostsInformationStatistics__statsContainer">
      <div className="PostsInformationStatistics__statsSubcontainer">
        <div className="PostsInformationStatistics__statsBox">
          <p>Posts</p>
          <p>{numberOfPosts}</p>
        </div>
        <div className="PostsInformationStatistics__statsBox">
          <p>Total likes </p>
          <p>{totalLikes}</p>
        </div>
      </div>
      <div className="PostsInformationStatistics__statsSubcontainer">
        <div className="PostsInformationStatistics__statsBox">
          <p>Total comments</p>
          <p>{totalComments}</p>
        </div>
        <div className="PostsInformationStatistics__statsBox">
          <p>Total likes received</p>
          <p>{totalLikesReceived}</p>
        </div>
      </div>
    </div>
  );
};

export default PostsInformationStatistics;
