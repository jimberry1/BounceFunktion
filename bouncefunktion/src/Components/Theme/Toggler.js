import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { RiMoonClearFill } from 'react-icons/ri';
import { FiSun } from 'react-icons/fi';
//   border: 2px solid ${({ theme }) => theme.toggleBorder};
const Toggle = ({ theme, toggleTheme }) => {
  console.log('theme= ' + theme);
  const Button = styled.button`
  background: ${({ theme }) => theme.background};
  color: ${(theme) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  outline: none;
  min-width: 50px;
  }
`;
  return (
    <Button onClick={toggleTheme}>
      {theme == 'light' ? <RiMoonClearFill /> : <FiSun />}
    </Button>
  );
};
Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};
export default Toggle;
