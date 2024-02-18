import { useEffect, useState } from "react";
import "./styles/App.css";
import Todolist from "./components/Todolist";
import Details from "./components/Details";
import SignIn from "./components/SiginIn";
import SignUp from "./components/SignUp";

import { auth, firestore } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import userImg from "./assets/user.png";
import x from "./assets/x.png";
import { collection, getDoc } from "firebase/firestore";

function App() {
  const [selectedTodo, SetSelectedTodo] = useState(null);
  // const [todos, setTodos] = useState(() => {
  //   const dataFromLocalStorage = localStorage.getItem("todos");
  //   return dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : [];
  // });
  const [todos, setTodos] = useState([]);

  const [userLogged, setUserLogged] = useState(null);

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        // const userId = user.uid;
        setUserLogged({
          email: user.email,
          userId: user.uid,
        });
      } else {
        //user is signout
      }
    });
  }, []);
  function closeSelected() {
    SetSelectedTodo(null);
  }
  function updatedLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  useEffect(updatedLocalStorage, [todos]);

  if (!userLogged) {
    return (
      <div className="App">
        {showLogin ? (
          <SignIn setShowLogin={setShowLogin} />
        ) : (
          <SignUp setShowLogin={setShowLogin} />
        )}
      </div>
    );
  } else {
    return (
      <div className="App">
        {!selectedTodo && (
          <>
            <User name={userLogged.email} setUserLogged={setUserLogged} />
            <Todolist
              todos={todos}
              setTodos={setTodos}
              SetSelectedTodo={SetSelectedTodo}
              userId={userLogged.userId}
            />
          </>
        )}

        {selectedTodo && (
          <Details
            selectedTodo={selectedTodo}
            setTodos={setTodos}
            todos={todos}
            handleClose={closeSelected}
            userId={userLogged.userId}
          />
        )}
      </div>
    );
  }
}

const User = ({ name, setUserLogged }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="user">
      <h1>Task Swift</h1>
      <div>
        {" "}
        <img
          src={showOptions ? x : userImg}
          onClick={() => setShowOptions((curr) => !curr)}
        />{" "}
      </div>
      {showOptions && <UserOptions name={name} setUserLogged={setUserLogged} />}
    </div>
  );
};

const UserOptions = ({ name, setUserLogged }) => {
  const [waiting, setWaiting] = useState(false);
  async function handleClick() {
    setWaiting(true);
    try {
      await signOut(auth);
      setUserLogged(null);
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

export default App;
