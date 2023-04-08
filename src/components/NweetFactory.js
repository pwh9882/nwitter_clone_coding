import { dbService, storageService } from "FirebaseApp";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const attachmentRef = useRef();
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweet);
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(attachmentRef);
    }

    const newNweet = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentUrl,
    };
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), newNweet);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      setAttachment(finishedEvent.target.result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
    attachmentRef.current.value = "";
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        name="contents"
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
        onChange={onChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={attachmentRef}
      />
      <input type="submit" value={"nweet"} />
      {attachment && (
        <div>
          <img src={attachment} width={50} height={50} alt="asdf" />
          <button onClick={onClearAttachment}>clear Photo</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
