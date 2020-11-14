import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { useStateValue } from '../Store/StateProvider';
import { actionTypes } from '../Store/reducer';
import db from '../firebase';
const Login = (props) => {
  const [state, dispatch] = useStateValue();

  const localStorageUid = localStorage.getItem('Bounce_uid');

  if (localStorageUid !== null) {
    const dbUserRef = db.collection('users').doc(localStorageUid);
    dbUserRef.get().then((docSnapshot) => {
      console.log(docSnapshot.data());
      console.log(docSnapshot.id);

      const user = {
        displayName: docSnapshot.data().name,
        email: docSnapshot.data().email,
        photoURL: docSnapshot.data().photoURL,
        uid: docSnapshot.id,
      };
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
      dispatch({
        type: actionTypes.SET_IDTOKEN,
        idToken: docSnapshot.id,
      });
    });
  }

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);

        const dbUserRef = db.collection('users').doc(result.user.uid);
        dbUserRef.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            console.log('This user already exists');
          } else {
            dbUserRef.set({
              photoURL: result.user.photoURL,
              name: result.user.displayName,
              email: result.user.email,
              likedPosts: [],
              favPosts: [],
              userScore: 0,
              badges: [],
              preferences: [],
            });
          }
        });

        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        dispatch({
          type: actionTypes.SET_IDTOKEN,
          idToken: result.user.uid,
        });
        localStorage.setItem('Bounce_uid', result.user.uid);
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
