import NavbarContainer from '../Containers/Navbar/NavbarContainer';
import FeedbackContainer from '../Containers/FeedbackContainer/FeedbackContainer';

const FeedbackPage = (props) => {
  return (
    <div>
      <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      <FeedbackContainer />
    </div>
  );
};

export default FeedbackPage;
