import { useState, useEffect } from 'react';
import db from '../../firebase';
import FunktionMemberListItem from '../../Components/MembersDisplay/FunktionMemberListItem';
import styled from 'styled-components';
import MemberDisplay from '../../Components/MembersDisplay/MemberDisplay/MemberDisplay';

const StyledTitleComponent = styled.h2`
  text-align: center;
  border-bottom: 1px solid;
  width: 400px;
  margin: auto;
  padding-bottom: 5px;
  @media (max-width: 399px) {
    border-bottom: none;
  }
`;

const SearchMembersByName = styled.input`
  width: 70%;
  padding: 10px;
  border-radius: 35px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  outline: none;
  //   background-color: lightgray;
`;

const MembersContainer = () => {
  //Members container first is going to make a call to the users node and get all that information and store it in useState
  const [users, setUsers] = useState([]);
  const [selectedMemberInformation, setSelectedMemberInformation] = useState(
    null
  );
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [numberOfComments, setNumberOfComments] = useState(0);

  useEffect(() => {
    async function getUserInformationFromFirebase() {
      await db
        .collection('users')
        .get()
        .then((collection) => {
          setUsers(
            collection.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.message);
        });
    }
    getUserInformationFromFirebase();
  }, []);

  // Get posts from selected user
  useEffect(() => {
    async function getPostsOfSelectedUserFromFirebase() {
      const postsDbRef = db
        .collection('posts')
        .where('uid', '==', selectedMemberInformation?.id);
      await postsDbRef
        .get()
        .then((posts) => {
          setSelectedUserPosts(
            posts.docs.map((post) => ({ id: post.id, data: post.data() }))
          );
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.message);
        });
    }
    if (selectedMemberInformation) {
      console.log('getting data');
      getPostsOfSelectedUserFromFirebase();
    }
  }, [selectedMemberInformation]);

  // Get number of comments from firebase
  useEffect(() => {
    async function getCommentNumberFromFirebase() {
      await db
        .collection('comments')
        .where('poster', '==', selectedMemberInformation.data.name)
        .get()
        .then((collection) => {
          console.log(collection.size);

          setNumberOfComments(collection.size);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.message);
        });
    }
    if (selectedMemberInformation) {
      getCommentNumberFromFirebase();
    }
  }, [selectedMemberInformation]);

  let usersToDisplay = users;
  if (nameFilter !== '') {
    usersToDisplay = usersToDisplay.filter((user) =>
      user.data.name.toUpperCase().startsWith(nameFilter.toUpperCase())
    );
  }
  const listOfUsers = usersToDisplay.map((user) => {
    return (
      <div key={user.id} onClick={() => setSelectedMemberInformation(user)}>
        <FunktionMemberListItem
          name={user.data.name}
          photoURL={user.data.photoURL}
        />
      </div>
    );
  });

  const navigateBackToFullUserList = () => {
    setSelectedMemberInformation(null);
    setNameFilter('');
  };

  const selectedUserDisplay = (
    <div>
      <MemberDisplay
        uid={selectedMemberInformation?.id}
        posts={selectedUserPosts}
        userData={selectedMemberInformation?.data}
        backButtonClicked={navigateBackToFullUserList}
        numberOfComments={numberOfComments}
      />
    </div>
  );

  return (
    <div style={{ marginBottom: '50px' }}>
      <StyledTitleComponent>Community members</StyledTitleComponent>
      {!selectedMemberInformation && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchMembersByName
            placeholder="Search name here..."
            onChange={(event) => setNameFilter(event.target.value)}
          />
        </div>
      )}
      {!selectedMemberInformation && listOfUsers}
      {selectedMemberInformation && selectedUserDisplay}
      {errorMessage}
    </div>
  );
};

export default MembersContainer;
