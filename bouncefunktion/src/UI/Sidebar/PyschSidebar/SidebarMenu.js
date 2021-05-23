import styled from 'styled-components';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { motion, useAnimation } from 'framer-motion';
import { useHistory } from 'react-router';

// export interface MenuProps {
//   logout: any;
//   setToggle: any;
//   toggled: boolean;
//   isAuthenticated: boolean;
// }

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  z-index: 150;
  @media (max-width: 1000px) {
    gap: 30px;
  }
`;

const MenuItem = styled(motion.span)`
  color: white;
  font-size: 30px;
  text-align: center;
  font-family: inherit;
  font-style: italic;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  z-index: 150;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;

const MenuItemVariants = {
  hover: {
    color: '#D309E1',
    scale: 1.2,
  },
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: { y: 0, opacity: 1, transition: { delay: 0.5 } },
};

// type player = { linkName: string, linkTo: string, color: string };

const Menu = ({ logout, setToggle, toggled, isAuthenticated }) => {
  const history = useHistory();
  const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];
  const linkArray = [
    {
      linkName: 'Home',
      linkTo: '',
      color: '#FF008C',
    },
    { linkName: 'Account', linkTo: 'profile', color: '#D309E1' },
    {
      linkName: 'Events',
      linkTo: 'events',
      color: '#9C1AFF',
    },
    { linkName: 'Privacy Policy', linkTo: 'privacyPolicy', color: '#7700FF' },
  ];
  const animationControl = useAnimation();
  const [redirectTo, setRedirectTo] = useState('');

  const logoutHandler = () => {
    localStorage.removeItem('psy_uid');
    setToggle();
    logout();
  };

  if (toggled) {
    animationControl.start('visible');
  } else {
    animationControl.start('hidden');
  }

  const RedirectHandler = (redirectToLocation) => {
    if (isAuthenticated) {
      history.push(`/${redirectToLocation}`);
    } else {
      history.push(`/signin?redirectTo=${redirectToLocation}`);
    }
    setToggle();
  };

  //   if (!isAuthenticated) {
  //     return (
  //       <MenuContainer>
  //         <MenuItem>Log in to access menu</MenuItem>
  //       </MenuContainer>
  //     );
  //   }
  return (
    <MenuContainer>
      {linkArray.map((linkObj, index) => {
        return (
          <MenuItem
            key={linkObj.color}
            onClick={() => RedirectHandler(linkObj.linkTo)}
            variants={{
              hover: {
                color: linkObj.color,
                scale: 1.2,
              },
              hidden: {
                y: 100,
                opacity: 0,
                color: linkObj.color,
              },
              visible: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.4 + 0.1 * index },
                color: '#FFFFFF',
              },
            }}
            animate={animationControl}
            whileHover="hover"
            whileTap="hover"
          >
            {linkObj.linkName}
          </MenuItem>
        );
      })}
      {/* <MenuItem
        onClick={logoutHandler}
        variants={{
          hover: {
            color: '#4400FF',
            scale: 1.2,
          },
          hidden: {
            y: 100,
            opacity: 0,
          },
          visible: { y: 0, opacity: 1, transition: { delay: 0.8 } },
        }}
        whileHover="hover"
        whileTap="hover"
        animate={animationControl}
      >
        Logout
      </MenuItem> */}
    </MenuContainer>
  );
};

export default Menu;
