import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Todolist from "./components/Todolist";
import Details from "./components/Details";
import SignIn from "./components/SiginIn";
import SignUp from "./components/SignUp";
import User from "./components/User";

import "./styles/App.css";

function App() {
  const [selectedTodo, SetSelectedTodo] = useState(null);
  // const [todos, setTodos] = useState(() => {
  //   const dataFromLocalStorage = localStorage.getItem("todos");
  //   return dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : [];
  // });
  const [todos, setTodos] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userLogged, setUserLogged] = useState({
    email: null,
    userId: null,
  });

  function closeSelected() {
    SetSelectedTodo(null);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged({
          email: user.email,
          userId: user.uid,
        });
        setShowUser(true);
      } else {
      }
    });
  }, []);

  /*
  function updatedLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  useEffect(updatedLocalStorage, [todos]);
  */
  if (showAuth) {
    return (
      <div className="App">
        {showLogin ? (
          <SignIn setShowLogin={setShowLogin} setShowAuth={setShowAuth} />
        ) : (
          <SignUp setShowLogin={setShowLogin} setShowAuth={setShowAuth} />
        )}
      </div>
    );
  } else {
    return (
      <div className="App">
        {!selectedTodo && (
          <>
            <User
              name={userLogged.email}
              setUserLogged={setUserLogged}
              showUser={showUser}
              setShowUser={setShowUser}
            />
            <Todolist
              todos={todos}
              setTodos={setTodos}
              SetSelectedTodo={SetSelectedTodo}
              userId={userLogged.userId}
              setShowLogin={setShowAuth}
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

export default App;
