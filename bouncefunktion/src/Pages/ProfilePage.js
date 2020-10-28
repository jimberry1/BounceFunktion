import NavbarContainer from '../Containers/Navbar/NavbarContainer';

const ProfilePage = (props) => {
  return (
    <div>
      <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
    </div>
  );
};

export default ProfilePage;
