import NavbarContainer from '../Containers/Navbar/NavbarContainer';
import PersonalInfoContainer from '../Containers/ProfileContainer/PersonalInfoContainer/PersonalInfoContainer';
import AchievementsContainer from '../Containers/ProfileContainer/AchievementsContainer/AchievementsContainer';
import FavouriteTracksContainer from '../Containers/ProfileContainer/FavouriteTracksContainer/FavouriteTracksContainer';
import ContributionsContainer from '../Containers/ProfileContainer/ContributionsContainer/ContributionsContainer';

const ProfilePage = (props) => {
  let subcategoryStyles = {
    padding: '20px',
    display: 'flex',
  };
  return (
    <div>
      <div>
        <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      </div>
      <div>
        <PersonalInfoContainer />
      </div>
      <div style={subcategoryStyles}>
        <div style={{ width: '50%', padding: '10px' }}>
          <FavouriteTracksContainer />
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <ContributionsContainer />
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <AchievementsContainer />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
