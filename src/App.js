import { useState } from "react";
import "./App.css";

export default function App() {
  const [selectedTodo, SetSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  function closeSelected() {
    SetSelectedTodo(null);
  }
  return (
    <div className="App">
      {!selectedTodo && (
        <>
          <h1>TaskSwift</h1>
          <Todolist
            todos={todos}
            setTodos={setTodos}
            SetSelectedTodo={SetSelectedTodo}
          />
        </>
      )}
      {selectedTodo && (
        <Details
          selectedTodo={selectedTodo}
          setTodos={setTodos}
          todos={todos}
          handleClose={closeSelected}
        />
      )}
    </div>
  );
}
function Todolist({ todos, setTodos, SetSelectedTodo }) {
  const [addNew, setAddNew] = useState(false);
  function handleClick() {
    setAddNew((p) => !p);
  }
  return (
    <>
      <div>
        {todos.map((todo) => (
          <Todo todo={todo} SetSelectedTodo={SetSelectedTodo} />
        ))}
      </div>
      {addNew && <Addtodos setTodos={setTodos} />}
      <Button handleClick={handleClick}>{addNew ? "Close" : "Add New"}</Button>
    </>
  );
}
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Heading:</label>
        <input
          type="text"
          onChange={(e) => setHead(e.target.value)}
          placeholder="Enter heading..."
          value={head}
          required={true}
        ></input>
      </div>
      <div>
        <label>details:</label>
        <input
          type="text"
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Enter Details..."
          value={detail}
          required={true}
        ></input>
      </div>
      <div>
        <label>Priority no.:</label>
        <input
          type="number"
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Enter Priority no...."
          value={priority ? priority : ""}
          required={true}
        ></input>
      </div>
      <Button>Submit📜</Button>
    </form>
  );
}
function Button({ handleClick, children }) {
  return (
    <button className="btn" onClick={handleClick}>
      {children}
    </button>
  );
}
function Todo({ todo, SetSelectedTodo }) {
  function handleClick() {
    SetSelectedTodo(todo);
    console.log("hello");
    console.log(todo);
  }
  return (
    <div>
      <div>
        <h3>{todo.heading}</h3>
        <Button handleClick={handleClick}>Open</Button>
      </div>
      <span>{"Added:" + todo.added}</span>
    </div>
  );
}
function Details({ selectedTodo, todos, setTodos, handleClose }) {
  const [newDetail, setNewDetail] = useState("");
  const [status, setStatus] = useState("pending");
  function handleSubmit(e) {
    e.preventDefault();
    if (status === "delete") {
      setTodos((e) => e.filter((curr) => curr.id !== selectedTodo.id));
      handleClose();
      return;
    }
    setTodos((e) =>
      e.map((curr) =>
        curr.id === selectedTodo.id
          ? {
              ...curr,
              state: status,
              paragraph: newDetail ? newDetail : curr.paragraph,
            }
          : curr
      )
    );
    setNewDetail("");
    setStatus("pending");
    handleClose();
  }
  return (
    <div>
      <i class="fa-solid fa-3x fa-xmark" onClick={handleClose}></i>
      <p>{selectedTodo.paragraph}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Modify Details:</label>
          <input
            type="text"
            placeholder="Enter new details..."
            value={newDetail}
            onChange={(e) => setNewDetail(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value={"pending"}>Pending🙅‍♀️</option>
            <option value={"finished"}>Finished✅</option>
            <option value={"delete"}>Delete 🗑🧹</option>
          </select>
        </div>
        <Button>Update</Button>
      </form>
    </div>
  );
}
