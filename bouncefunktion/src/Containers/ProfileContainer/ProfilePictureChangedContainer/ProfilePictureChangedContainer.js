import React, { useState } from 'react';
import db, { storage } from '../../../firebase';
import Firebase from 'firebase';
import { AiFillCamera } from 'react-icons/ai';
import { Avatar } from '@material-ui/core';
import BlueButton from '../../../UI/Modal/Buttons/BlueButton/BlueButton';

const ProfilePictureChangedContainer = (props) => {
  const [profilePicToUpload, setProfilePicToUpload] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const hiddenFileInput = React.useRef(null);

  const fileSelectionHandler = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e) => {
    setProfilePicToUpload(e.target.files[0]);
    props.changedProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const fileUploadHandler = (e) => {
    if (profilePicToUpload) {
      const storageRef = storage.ref('profilePictures/' + props.uid);
      const uploadTask = storageRef.put(profilePicToUpload);

      uploadTask.on(
        Firebase.storage.TaskEvent.STATE_CHANGED,
        function progress(snapshot) {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        function error(err) {
          console.log(err);
        },
        function complete() {
          console.log('Profile picture upload complete!');
          storageRef.getDownloadURL().then((url) => {
            db.collection('users')
              .doc(props.uid)
              .set({ photoURL: url }, { merge: true });
          });
        }
      );
    }
    setProfilePicToUpload(null);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div>
        <input
          type="file"
          id="upload"
          ref={hiddenFileInput}
          style={{ display: 'none' }}
          onChange={(e) => handleFileChange(e)}
        />

        <button
          onClick={fileSelectionHandler}
          style={{
            background: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            outline: 'none',
            alignContent: 'center',
            width: '100%',
          }}
        >
          <AiFillCamera />
        </button>
        <div
          style={{
            display: profilePicToUpload !== null ? 'flex' : 'none',
            outline: 'none',
            border: 'none',
            flex: '1',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BlueButton onClick={(e) => fileUploadHandler(e)}>Confirm</BlueButton>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureChangedContainer;
