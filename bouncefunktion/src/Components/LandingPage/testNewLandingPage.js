import './testNewLandingPage.css';
import { useState } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import BounceLogoCicle from '../../Assets/BounceLogo2Circle.png';
import HeaderbarPhone from '../HeaderNavbar/HeaderbarPhone/HeaderbarPhone';
import Sidebar from '../../UI/Sidebar/Sidebar';
import GlitchText from '../testGlitchText/GlitchText';
import ControlledCarousel from '../../UI/Carousel/ControlledCarousel';
import PyschSidebar from '../../UI/Sidebar/PyschSidebar/PyschSidebar';
import { motion } from 'framer-motion';
import { useStateValue } from '../../Store/StateProvider';
const TestNewLandingPage = (props) => {
  const [toggled, setToggled] = useState(false);
  const [{ user }] = useStateValue();
  return (
    <div>
      <div className="testNewLandingPageContainer">
        <div className="HamburgerContainer">
          <PyschSidebar
            toggled={toggled}
            setToggled={() => setToggled((curVal) => !curVal)}
            logout={() => {}}
            isAuthenticated={user ? true : false}
          />
        </div>
        <div className="LandingPageLogoContainer">
          <img src={BounceLogoCicle} />
        </div>
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -50,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          animate="visible"
          className="LandingPagetitleText"
        >
          <span>Bounce</span>
        </motion.div>
      </div>
      <ControlledCarousel />
      <div className="LetsConnectSubsectionContainerGrid">
        {/* <div className="LetsConnectSubsectionContainerTitle">Let's connect</div>
        <div className="spotifyIcon">
          <img src="https://img.icons8.com/plasticine/2x/spotify.png" />
        </div> */}
      </div>
    </div>
  );
};

export default TestNewLandingPage;
