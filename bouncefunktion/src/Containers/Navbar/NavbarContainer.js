import './NavbarContainer.css';
import HeaderNavbar from '../../Components/HeaderNavbar/HeaderNavbar';
import HeaderbarPhone from '../../Components/HeaderNavbar/HeaderbarPhone/HeaderbarPhone';

const NavbarContainer = (props) => {
  return (
    <div>
      <div className="NavbarContainer__desktop">
        <HeaderNavbar theme={props.theme} toggleTheme={props.toggleTheme} />
      </div>
      <div className="NavbarContainer__phone">
        <HeaderbarPhone theme={props.theme} toggleTheme={props.toggleTheme} />
      </div>
    </div>
  );
};

export default NavbarContainer;
