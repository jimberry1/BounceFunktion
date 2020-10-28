import NavbarContainer from '../Containers/Navbar/NavbarContainer';

const MixesPage = (props) => {
  return (
    <div>
      <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      <h3>
        We want nothing more than to support our community by promoting
        playlists and mixes made and curated by Bounce Funktion members
      </h3>
      <p>
        ...However we are sorry to annouce that this functionality isn't
        available at the moment. Please check back at a later date
      </p>
    </div>
  );
};

export default MixesPage;
