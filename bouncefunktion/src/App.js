import React, { useState, useEffect } from 'react';
import Homepage from './Pages/Homepage';
import FeedPage from './Pages/FeedPage';
import MixesPage from './Pages/MixesPage';
import EventsPage from './Pages/EventsPage';
import ProfilePage from './Pages/ProfilePage';
import FeedbackPage from './Pages/FeedbackPage';
import MembersPage from './Pages/MembersPage';
import TestPage from './Pages/TestPage';
import GlobalStyles from './Components/Theme/GlobalStyles';
import { useDarkMode } from './Components/Theme/useDarkMode';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Components/Theme/Themes';
import { Switch, Route, Redirect } from 'react-router';
import Login from './Auth/Login';
import { useStateValue } from './Store/StateProvider';
import { useLocation } from 'react-router';

function App() {
  console.log('Rendering App.js');
  const [redirectTo, setRedirectTo] = useState('');
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const location = useLocation();

  useEffect(() => {
    const queryString = require('query-string');
    const parsed = queryString.parse(location.search);
    if (parsed.redirectTo) {
      setRedirectTo(parsed.redirectTo);
    }
  }, [location]);

  const [{ user }, dispatch] = useStateValue();

  if (!mountedComponent) return <div />;
  return (
    <>
      {!user ? (
        <ThemeProvider theme={themeMode}>
          <>
            <GlobalStyles />
            <Switch>
              <Route path="/signin" component={Login} />
              <Route
                path="/"
                render={() => (
                  <Homepage theme={theme} themeToggler={themeToggler} />
                )}
              />
              <Redirect to="/" />
            </Switch>
          </>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={themeMode}>
          <>
            <GlobalStyles />
            <div>
              <Switch>
                <Route
                  path="/feed"
                  render={() => (
                    <FeedPage theme={theme} themeToggler={themeToggler} />
                  )}
                />
                <Route
                  path="/mixes"
                  render={() => (
                    <MixesPage theme={theme} themeToggler={themeToggler} />
                  )}
                />
                <Route
                  path="/events"
                  render={() => (
                    <EventsPage theme={theme} themeToggler={themeToggler} />
                  )}
                />
                <Route
                  path="/profile"
                  render={() => (
                    <ProfilePage theme={theme} themeToggler={themeToggler} />
                  )}
                />
                <Route
                  path="/community"
                  render={() => (
                    <MembersPage theme={theme} themeToggler={themeToggler} />
                  )}
                />
                <Route
                  path="/feedback"
                  render={() => (
                    <FeedbackPage theme={theme} themeToggler={themeToggler} />
                  )}
                />
                <Route
                  path="/test"
                  render={() => (
                    <TestPage theme={theme} themeToggler={themeToggler} />
                  )}
                />
                <Route
                  path="/"
                  exact
                  render={() => (
                    <Homepage theme={theme} themeToggler={themeToggler} />
                  )}
                />
                <Redirect to={`/${redirectTo}`} />
              </Switch>
            </div>
          </>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
