import { useState } from 'react';
import NavbarContainer from '../Containers/Navbar/NavbarContainer';

const TestPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSettings = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <NavbarContainer />
      <p>We Out Here!</p>
    </div>
  );
};

export default TestPage;
