import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import SidebarMenu from './SidebarMenu';
import HamburgerMenu from 'react-hamburger-menu';
const SideDrawer = styled.div`
  height: 110vh;
  width: 35vw;
  position: absolute;
  left: -60vw;
  background: black;
  color: white;
  z-index: 150;
  top: -15vh;
`;

const HamburgerContainer = styled.div`
  position: absolute;
  left: 20px;
  z-index: 150;
`;

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: gray;
  left: ${({ toggled }) => (toggled ? '0' : '-200vw')};
  content: '';
  opacity: 0.5;
  //   z-index: 100;
`;

const Sidedraw = ({ toggled, setToggled, logout, isAuthenticated }) => {
  const animationControl = useAnimation();

  useEffect(() => {
    if (toggled) {
      animationControl.start('visible');
    } else {
      animationControl.start('hidden');
    }
  }, [toggled]);
  return (
    <div>
      <HamburgerContainer>
        <HamburgerMenu
          isOpen={toggled}
          menuClicked={setToggled}
          color="white"
          strokeWidth={5}
        />
      </HamburgerContainer>
      <Backdrop toggled={toggled} onClick={setToggled} />

      <motion.div
        variants={{
          hidden: { x: '-50vw', opacity: 0.2 },
          visible: {
            x: '50vw',
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
          },
        }}
        animate={animationControl}
      >
        <SideDrawer>
          <SidebarMenu
            logout={logout}
            setToggle={setToggled}
            toggled={toggled}
            isAuthenticated={isAuthenticated}
          />
        </SideDrawer>
      </motion.div>
    </div>
  );
};

export default Sidedraw;
