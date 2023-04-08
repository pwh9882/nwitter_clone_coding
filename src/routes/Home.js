import { dbService, storageService } from "FirebaseApp";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    // getNweets();'
    const qurey = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(qurey, (snapshot) => {
      console.log("Some thing changed");
      //   console.log(snapshot.docs);
      const nweetsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetsArray);
    });
  }, []);
  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweeted) => (
          <Nweet
            key={nweeted.id}
            nweetObj={nweeted}
            isOwner={userObj.uid === nweeted.creatorId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
