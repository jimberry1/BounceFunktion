import './PostComment.css';
import { Avatar } from '@material-ui/core';
const PostComment = (props) => {
  return (
    <div className="postComment__holder">
      <Avatar src={props.profilePic} />
      <p className={'postComment__name'}>
        <strong>{props.poster}</strong>
      </p>
      <p className="postComment__comment">{props.message}</p>
    </div>
  );
};

export default PostComment;
