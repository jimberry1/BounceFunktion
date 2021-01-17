import FeedContainer from '../Containers/FeedContainer/FeedContainer';
import PostCreator from '../Components/Post/PostCreator/PostCreator';
import HeaderImage from '../Components/HeaderImage/HeaderImage';
import FeedPageHeaderImage from '../Assets/turntables.jpg';
import PullToRefreshForPage from '../UI/Loader/PullToRefreshForPage';
const {
  default: NavbarContainer,
} = require('../Containers/Navbar/NavbarContainer');

const FeedPage = (props) => {
  const backgroundImage =
    props.theme === 'light'
      ? 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzJ8fGJhY2tncm91bmR8ZW58MHx8MHw%3D&auto=format&fit=crop&w=800&q=60'
      : // 'https://images.unsplash.com/photo-1509647648544-a3e09b751ad6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTMwfHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
        'https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGJhY2tncm91bmR8ZW58MHwxfDB8&auto=format&fit=crop&w=800&q=60';
  // 'https://images.unsplash.com/photo-1536300995586-2c63143ea13f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OTZ8fHxlbnwwfHx8&auto=format&fit=crop&w=800&q=60'

  var styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  return (
    <div>
      <PullToRefreshForPage>
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
            <FeedContainer theme={props.theme} />
          </div>
        </div>
      </PullToRefreshForPage>
    </div>
  );
};

export default FeedPage;
