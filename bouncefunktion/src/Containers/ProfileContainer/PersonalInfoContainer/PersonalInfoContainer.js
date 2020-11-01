import PersonalInfoDisplay from '../../../Components/Profile/PersonalInfoDisplay/PersonalInfoDisplay';
import { useStateValue } from '../../../Store/StateProvider';

const PersonalInfoContainer = (props) => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <PersonalInfoDisplay user={user} />
    </div>
  );
};

export default PersonalInfoContainer;
