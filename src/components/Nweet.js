import { dbService, storageService } from "FirebaseApp";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const docRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClicked = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    console.log(ok);
    if (ok) {
      await deleteDoc(docRef);
      if (nweetObj.attachmentUrl !== "")
        await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    updateDoc(docRef, { text: newNweet });
    toggleEditing();
  };
  const onChange = (event) => {
    setNewNweet(event.target.value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Edit your Nweet"
              value={newNweet}
              required
            />
            <input type="submit" value={"Update Nweet"} />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl !== "" && (
            <img src={nweetObj.attachmentUrl} />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Nweet</button>
              <button onClick={onDeleteClicked}>Delete Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
