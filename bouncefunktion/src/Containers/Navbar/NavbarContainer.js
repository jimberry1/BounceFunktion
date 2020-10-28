import HeaderNavbar from '../../Components/HeaderNavbar/HeaderNavbar';

const NavbarContainer = (props) => {
  return <HeaderNavbar theme={props.theme} toggleTheme={props.toggleTheme} />;
};

export default NavbarContainer;
