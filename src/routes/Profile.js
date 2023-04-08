import { authService, dbService } from "FirebaseApp";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreashUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogoutClicked = () => {
    authService.signOut();
    navigate("/");
  };
  const nweetsQuery = query(
    collection(dbService, "nweets"),
    where("creatorId", "==", userObj.uid),
    orderBy("createdAt", "desc")
  );
  const getMyNweets = async () => {
    const nweetsSnapshoot = await getDocs(nweetsQuery);
    // console.log(nweetsSnapshoot);
    nweetsSnapshoot.forEach((doc) => {
      console.log(doc);
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreashUser();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <h1>PROFILE</h1>
      <button onClick={onLogoutClicked}>Log Out</button>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Display Name"
          value={newDisplayName}
        />
        <input type="submit" value={"Update Profile"} />
      </form>
    </>
  );
};
export default Profile;
