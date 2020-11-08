import NavbarContainer from '../Containers/Navbar/NavbarContainer';
import PersonalInfoContainer from '../Containers/ProfileContainer/PersonalInfoContainer/PersonalInfoContainer';
import AchievementsContainer from '../Containers/ProfileContainer/AchievementsContainer/AchievementsContainer';
import FavouriteTracksContainer from '../Containers/ProfileContainer/FavouriteTracksContainer/FavouriteTracksContainer';
import ContributionsContainer from '../Containers/ProfileContainer/ContributionsContainer/ContributionsContainer';
import { Container, Row, Col } from 'react-bootstrap';

const ProfilePage = (props) => {
  let subcategoryStyles = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'columm',
  };
  return (
    <div style={{ marginBottom: '30px' }}>
      <div>
        <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      </div>
      <div>
        <PersonalInfoContainer />
      </div>
      <Container>
        <Row>
          <Col style={{ marginTop: '15px' }}>
            <FavouriteTracksContainer />
          </Col>
          <Col style={{ marginTop: '15px' }}>
            <ContributionsContainer />
          </Col>
        </Row>
        <Row style={{ marginTop: '50px' }}>
          <Col>
            <AchievementsContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
