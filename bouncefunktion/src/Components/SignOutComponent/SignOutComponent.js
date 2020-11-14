import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';
import { useStateValue } from '../../Store/StateProvider';
import { actionTypes } from '../../Store/reducer';

const SignOutComponent = () => {
  const [signOut, setSignOut] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  const signOutHandler = () => {
    localStorage.removeItem('Bounce_uid');
    setSignOut(true);

    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
  };

  let redirectComponent = null;

  if (signOut) {
    redirectComponent = <Redirect to="/" />;
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '75px' }}
    >
      <form>
        {redirectComponent}
        <BlueButton clicked={signOutHandler}>Sign out</BlueButton>
      </form>
    </div>
  );
};

export default SignOutComponent;
