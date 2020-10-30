import { useState } from 'react';
import NavbarContainer from '../Containers/Navbar/NavbarContainer';
import HeaderImage from '../Components/HeaderImage/HeaderImage';
import EventsHeaderImage from '../Assets/festival2.jpg';
const EventsPage = (props) => {
  return (
    <div>
      <div>
        <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
        <HeaderImage
          backgroundImage={EventsHeaderImage}
          title="Events. Made simple."
          subtitle="Post about live music, club nights and festivals"
          topMargin="-100px"
          titleFontColour="white"
          subtitleFontColour="white"
        />
      </div>
    </div>
  );
};

export default EventsPage;
