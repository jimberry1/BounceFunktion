import './FunktionMemberListItem.css';
import { Avatar } from '@material-ui/core';

const FunktionMemberListItem = ({ name, photoURL, ...props }) => {
  return (
    <div className="FunktionMemberListItem__container" onClick={props.clicked}>
      <div className="FunktionMemberListItem__avatar">
        <Avatar src={photoURL} />
      </div>
      <div className="FunktionMemberListItem__name">
        <p>{name}</p>
      </div>
    </div>
  );
};

export default FunktionMemberListItem;
