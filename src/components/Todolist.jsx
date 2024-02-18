import { useState, useEffect, useId } from "react";
import Button from "../components/Button";
import Addtodos from "../components/Addtodos";
import Todo from "../components/Todo";
import "../styles/Todolist.css";

import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
function Todolist({ todos, setTodos, SetSelectedTodo, userId }) {
  const [addNew, setAddNew] = useState(false);
  function handleClick() {
    setAddNew((p) => !p);
  }
  const [deleting, setDeleting] = useState(false);
  const deleteWithId = async (id) => {
    try {
      await deleteDoc(doc(firestore, `users/${userId}/todos/${id}`));
    } catch (e) {
      throw new Error("cannot Delete All at this moment");
    }
  };
  const deleteAll = async () => {
    todos.forEach((todo) => {
      deleteWithId(todo.id);
    });
  };

  function clearList() {
    deleteAll();
    setTodos((curr) => []);
  }

  const [fetching, setFetching] = useState(true);

  const fetchTodos = async () => {
    setFetching(true);
    try {
      const userTodosCollection = collection(
        firestore,
        `users/${userId}/todos`
      );
      const snapShot = await getDocs(userTodosCollection);
      const todosData = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos((curr) => todosData);
      // console.log(todos);
      setTodos((todos) => {
        return todos.sort((todo1, todo2) => {
          return todo2.priority - todo1.priority;
        });
      });
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  };
  useEffect(() => {
    console.log(userId);
    if (userId !== null) fetchTodos(userId);
  }, []);

  return (
    <>
      <div className="todo-list">
        {!fetching ? (
          todos.map((todo) => (
            <Todo todo={todo} SetSelectedTodo={SetSelectedTodo} />
          ))
        ) : (
          <div>
            <p>Fetching...</p>
          </div>
        )}
      </div>
      {addNew && <Addtodos setTodos={setTodos} userId={userId} />}
      <div className="handlers">
        <Button handleClick={handleClick}>
          {addNew ? "Close" : "Add New"}
        </Button>
        {todos.length > 0 && (
          <Button handleClick={clearList}>
            {deleting ? "clearing..." : " Clear All"}
          </Button>
        )}
      </div>
    </>
  );
}

export default Todolist;
