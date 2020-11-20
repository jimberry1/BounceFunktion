import React, { useState } from 'react';
import db, { storage } from '../../../firebase';
import Firebase from 'firebase';
import { AiFillCamera } from 'react-icons/ai';
import { Avatar } from '@material-ui/core';

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
            border: 'none',
            outline: 'none',
            marginTop: '150px',
          }}
        >
          <AiFillCamera />
        </button>
        <button
          onClick={(e) => fileUploadHandler(e)}
          style={{
            display: profilePicToUpload !== null ? '' : 'none',
            backgroundColor: 'green',
            borderRadius: '15px',
            outline: 'none',
            border: 'none',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ProfilePictureChangedContainer;
