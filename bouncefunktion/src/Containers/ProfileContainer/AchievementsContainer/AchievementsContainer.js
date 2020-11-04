import Achievements from '../../../Components/Profile/Achievements/Achievements';
import './AchievementsContainer.css';
import { FaTrophy } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { MdEventAvailable } from 'react-icons/md';

const AchievementsContainer = (props) => {
  return (
    <div className="achievementsContainer__container">
      <div className="achievements_title">
        <Achievements />
      </div>
      <div className="achievement__container">
        <p>This is an example of what I want this section to look like</p>
      </div>
      <div className="achievement__container">
        <p>Post 5 times</p>

        <div className="achievement__icon">
          <FaTrophy size={32} color="gold" />
        </div>
      </div>
      <div className="achievement__container">
        <p>Like 10 Posts</p>
        <div className="achievement__icon">
          <AiFillLike size={32} color="darkblue" />
        </div>
      </div>
      <div className="achievement__container">
        <p>Leave 5 comments</p>
        <div className="achievement__icon">
          <BiCommentDetail size={32} color="gray" />
        </div>
      </div>
      <div className="achievement__container">
        <p>Attend an event</p>
        <div className="achievement__icon">
          <MdEventAvailable size={32} color="red" />
        </div>
      </div>
    </div>
  );
};

export default AchievementsContainer;
