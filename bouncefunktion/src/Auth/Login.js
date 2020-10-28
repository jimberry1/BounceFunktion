import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { useStateValue } from '../Store/StateProvider';
import { actionTypes } from '../Store/reducer';
import { Avatar } from '@material-ui/core';
import db from '../firebase';
const Login = (props) => {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        dispatch({
          type: actionTypes.SET_IDTOKEN,
          idToken: result.user.uid,
        });
      })
      .catch((error) => {
        alert(error.messsage);
      });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://images.unsplash.com/photo-1551081831-02459886c4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
          alt=""
        />
        <h1 className="login__title">The Bounce Funktion</h1>
      </div>
      <Button type="submit" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
};

export default Login;
