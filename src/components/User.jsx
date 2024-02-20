import { useState } from "react";
import userImg from "../assets/user.png";
import x from "../assets/x.png";
import UserOptions from "./UserOptions";

const User = ({ name, setUserLogged, showUser, setShowUser }) => {
  // console.log(name);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="user">
      <h1>Task Swift</h1>
      {showUser && (
        <>
          <div>
            {" "}
            <img
              src={showOptions ? x : userImg}
              onClick={() => setShowOptions((curr) => !curr)}
            />{" "}
          </div>
          {showOptions && (
            <UserOptions
              name={name}
              setUserLogged={setUserLogged}
              setShowUser={setShowUser}
            />
          )}
        </>
      )}
    </div>
  );
};
export default User;
