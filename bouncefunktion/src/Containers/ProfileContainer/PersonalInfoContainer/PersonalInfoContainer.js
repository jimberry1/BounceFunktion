import { useState } from 'react';
import PersonalInfoDisplay from '../../../Components/Profile/PersonalInfoDisplay/PersonalInfoDisplay';
import { useStateValue } from '../../../Store/StateProvider';
import { storage } from '../../../firebase';

const PersonalInfoContainer = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [urlForNewProfilePic, setUrlForNewProfilePic] = useState(null);

  const handleProfilePicChanged = (url) => {
    setUrlForNewProfilePic(url);
  };

  return (
    <div>
      <PersonalInfoDisplay user={user} />
    </div>
  );
};

export default PersonalInfoContainer;
