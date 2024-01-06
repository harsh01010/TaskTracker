import { useState } from "react";
import Button from "./Button";
import Addtodos from "./Addtodos";
import Todo from "./Todo";
import "./Todolist.css";
function Todolist({ todos, setTodos, SetSelectedTodo }) {
  const [addNew, setAddNew] = useState(false);
  function handleClick() {
    setAddNew((p) => !p);
  }
  return (
    <>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo todo={todo} SetSelectedTodo={SetSelectedTodo} />
        ))}
      </div>
      {addNew && <Addtodos setTodos={setTodos} />}
      <Button handleClick={handleClick}>{addNew ? "Close" : "Add New"}</Button>
    </>
  );
}

export default Todolist;
