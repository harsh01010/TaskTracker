import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "../styles/Addtodos.css";

import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { auth } from "../firebase";

function Addtodos({ setTodos, userId }) {
  const [head, setHead] = useState(``);
  const [detail, setDetail] = useState(``);
  const [priority, setPriority] = useState(null);

  const inp = useRef();
  useEffect(() => {
    inp.current.focus();
  }, []);
  async function handleSubmit(e) {
    if (adding) return;
    e.preventDefault();
    if (!head || !detail || !priority) return;
    setAdding(true);
    const newTodo = {
      heading: head,
      paragraph: detail,
      priority: priority,
      added: new Date().toISOString().split("T")[0],
      state: "pending",
    };
    // console.log(newTodo);

    try {
      const userTodoCollection = collection(firestore, `users/${userId}/todos`);
      const res = await addDoc(userTodoCollection, newTodo);
      // console.log(res.id);

      setTodos((todos) => [...todos, { ...newTodo, id: res.id }]);
      setTodos((todos) => {
        console.log(todos);
        return todos.sort((todo1, todo2) => {
          return todo2.priority - todo1.priority;
        });
      });
    } catch (e) {
      console.error("cannot todo to the firestore, " + e.code);
    }

    setHead(``);
    setDetail(``);
    setPriority(null);
    setAdding(false);
  }

  const [adding, setAdding] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="gap">
        <label>Heading:</label>
        <input
          className="inpadd"
          type="text"
          onChange={(e) => setHead(e.target.value)}
          placeholder="Enter heading..."
          value={head}
          required={true}
          ref={inp}
        ></input>
      </div>
      <div className="details gap">
        <label>Details:</label>
        <input
          className="inpadd inpdet"
          type="text"
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Enter Details..."
          value={detail}
          required={true}
        ></input>
      </div>
      <div className="gap">
        <label>Priority no.:</label>
        <input
          className="inpadd"
          type="number"
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Enter Priority no...."
          value={priority ? priority : ""}
          required={true}
        ></input>
      </div>
      <div className="gap addbtn">
        <Button disabled={adding}>{adding ? "Adding..." : "Submit📜"}</Button>
      </div>
    </form>
  );
}

export default Addtodos;
