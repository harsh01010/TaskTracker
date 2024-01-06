import { useState } from "react";
import Button from "./Button";
import "./Addtodos.css";
function Addtodos({ setTodos }) {
  const [head, setHead] = useState(``);
  const [detail, setDetail] = useState(``);
  const [priority, setPriority] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    if (!head || !detail || !priority) return;
    const newTodo = {
      id: new Date().getTime(),
      heading: head,
      paragraph: detail,
      priority: priority,
      added: new Date().toISOString().split("T")[0],
      state: "pending",
    };
    console.log(newTodo);
    setTodos((todos) => [...todos, newTodo]);
    setTodos((todos) => {
      return todos.sort((todo1, todo2) => {
        return todo2.priority - todo1.priority;
      });
    });

    setHead(``);
    setDetail(``);
    setPriority(null);
  }
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
        <Button>Submit📜</Button>
      </div>
    </form>
  );
}

export default Addtodos;