import NavbarContainer from '../Containers/Navbar/NavbarContainer';
import MixesContainer from '../Containers/MixesContainer/MixesContainer';
import HeaderImage from '../Components/HeaderImage/HeaderImage';
const MixesPage = (props) => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px 25px',
    marginTop: '250px',
    border: '5px solid black',
    backgroundColor: 'gray',
    margin: 'auto',
  };

  return (
    <div>
      <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      <HeaderImage
        backgroundImage="https://images.pexels.com/photos/681467/pexels-photo-681467.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        title="Funktion Mixes"
        subtitle="Explore mixes made by funktion members"
        topMargin="-100px"
        titleFontColour="white"
        subtitleFontColour="lightgray"
      />
      <MixesContainer theme={props.theme} />
    </div>
  );
};

export default MixesPage;
