import GlitchText from '../testGlitchText/GlitchText';
import Logo from '../../Assets/TBFlogo.png';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import './GlitchLandingPage.css';
import * as Scroll from 'react-scroll';
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';

const GlitchLandingPage = () => {
  return (
    <div className="testGlitchContainer">
      <div className="grid_box1">
        <GlitchText glitchText="The" />
      </div>
      <div className="grid_box2">
        <GlitchText glitchText="Bounce" />
      </div>
      {/* <div className="grid_center"> */}
      <img src={Logo} className="grid_center_image" />
      {/* </div> */}
      <div className="grid_box3">
        {/* <GlitchText glitchText="F" secondaryText="unktion" /> */}
        <GlitchText glitchText="Funktion" />
      </div>
      <Link
        activeClass="active"
        to="test1"
        spy={true}
        smooth={true}
        offset={0}
        duration={750}
        className="grid_middle_bottom"
      >
        <IoIosArrowDropdownCircle color="white" />
      </Link>
    </div>
  );
};

export default GlitchLandingPage;
