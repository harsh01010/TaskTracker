import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const UserOptions = ({ name, setUserLogged, setShowUser }) => {
  const [waiting, setWaiting] = useState(false);
  async function handleClick() {
    setWaiting(true);
    try {
      await signOut(auth);
      setUserLogged({
        email: null,
        userId: null,
      });
      setShowUser(false);
    } catch (e) {
      alert("can't sign out!");
    }

    setWaiting(false);
  }

  return (
    <div className="options">
      {!waiting ? (
        <>
          <span>Hi,{name}</span>
          <span className="decorated" onClick={handleClick}>
            Log Out &rarr;
          </span>
        </>
      ) : (
        <span>Signing Out...</span>
      )}
    </div>
  );
};

export default UserOptions;
