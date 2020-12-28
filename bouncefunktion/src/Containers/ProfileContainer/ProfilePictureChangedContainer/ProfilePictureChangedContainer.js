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
  const [error, setError] = useState('');

  const hiddenFileInput = React.useRef(null);

  const fileSelectionHandler = () => {
    setError('');
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0].type);
    if (
      e.target.files[0]?.type == 'image/png' ||
      e.target.files[0]?.type == 'image/jpeg'
    ) {
      setProfilePicToUpload(e.target.files[0]);
      props.changedProfilePic(URL.createObjectURL(e.target.files[0]));
    } else {
      setError('Please select a file of type jpeg or png');
    }
  };

  if (profilePicToUpload) {
    console.log('profile picture to upload type= ' + profilePicToUpload.type);
  }

  const fileUploadHandler = () => {
    console.log('upload handler clicked');
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
          //   const batch = db.batch();
          storageRef
            .getDownloadURL()
            .then((url) => {
              const usersRef = db.collection('users').doc(props.uid);

              usersRef.update({ photoURL: url });

              db.collection('posts')
                .where('uid', '==', props.uid)
                .get()
                .then((usersPosts) => {
                  usersPosts.docs.forEach((userPost) => {
                    const docRef = db.collection('posts').doc(userPost.id);
                    // batch.update(docRef, { profilePic: url });
                    docRef.update({ profilePic: url });
                  });
                });
            })
            .catch((err) => {
              setError(
                'An error occurred when uploading your new profile picture'
              );
              console.log(err);
            });
          //   batch.commit();
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>{error}</div>

        <div
          style={{
            display: profilePicToUpload == null ? 'none' : 'flex',
            outline: 'none',
            border: 'none',
            flex: '1',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BlueButton clicked={fileUploadHandler}>Confirm</BlueButton>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureChangedContainer;
