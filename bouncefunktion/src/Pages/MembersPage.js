import NavbarContainer from '../Containers/Navbar/NavbarContainer';
import HeaderImage from '../Components/HeaderImage/HeaderImage';
import MembersContainer from '../Containers/MembersContainer/MembersContainer';

const MembersPage = (props) => {
  return (
    <div style={{ overflowX: 'none' }}>
      <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      <HeaderImage
        backgroundImage="https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dGVhbXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        title="Funktion Members"
        subtitle="Check out the members of our community"
        topMargin="-100px"
        titleFontColour="white"
        subtitleFontColour="lightgray"
      />
      <MembersContainer />
    </div>
  );
};

export default MembersPage;
