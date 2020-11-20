import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDNwbzsIasCfakOIL6yjJBrNuRaYC0l4Ro',
  authDomain: 'bouncefunktion.firebaseapp.com',
  databaseURL: 'https://bouncefunktion.firebaseio.com',
  projectId: 'bouncefunktion',
  storageBucket: 'bouncefunktion.appspot.com',
  messagingSenderId: '886998306194',
  appId: '1:886998306194:web:5052ed2c7ba3d271df054b',
  measurementId: 'G-ZP4HSHGRXQ',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;
