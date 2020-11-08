import React, { useState, useEffect } from 'react';
import Homepage from './Pages/Homepage';
import FeedPage from './Pages/FeedPage';
import MixesPage from './Pages/MixesPage';
import EventsPage from './Pages/EventsPage';
import ProfilePage from './Pages/ProfilePage';
import TestPage from './Pages/TestPage';
import GlobalStyles from './Components/Theme/GlobalStyles';
import { useDarkMode } from './Components/Theme/useDarkMode';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Components/Theme/Themes';
import { Switch, Route } from 'react-router';
import Login from './Auth/Login';
import { useStateValue } from './Store/StateProvider';
import FeedbackPage from './Pages/FeedbackPage';

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const [{ user }, dispatch] = useStateValue();

  if (!mountedComponent) return <div />;
  return (
    <>
      {!user ? (
        <Login />
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
              </Switch>
            </div>
          </>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
