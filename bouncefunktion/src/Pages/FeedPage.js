import FeedContainer from '../Containers/FeedContainer/FeedContainer';
import PostCreator from '../Components/Post/PostCreator/PostCreator';
import HeaderImage from '../Components/HeaderImage/HeaderImage';
import FeedPageHeaderImage from '../Assets/turntables.jpg';
const {
  default: NavbarContainer,
} = require('../Containers/Navbar/NavbarContainer');

const FeedPage = (props) => {
  const backgroundImage =
    'https://images.unsplash.com/photo-1541500792866-07f25e0c8578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';

  var styles = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <div>
      <div>
        <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
        <div style={styles}>
          <HeaderImage
            backgroundImage={FeedPageHeaderImage}
            title="The Funktion Feed"
            subtitle="Your tracks in one space."
            topMargin="-100px"
            titleFontColour="white"
            subtitleFontColour="lightgray"
          />
          <div style={{ margin: 'auto' }}>
            <div
              style={{
                width: '90%',
                margin: 'auto',
              }}
            >
              <PostCreator />
            </div>
            <FeedContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
