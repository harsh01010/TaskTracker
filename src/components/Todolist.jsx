import { useState } from "react";
import Button from "../components/Button";
import Addtodos from "../components/Addtodos";
import Todo from "../components/Todo";
import "../styles/Todolist.css";
function Todolist({ todos, setTodos, SetSelectedTodo }) {
  const [addNew, setAddNew] = useState(false);
  function handleClick() {
    setAddNew((p) => !p);
  }
  function clearList() {
    setTodos((curr) => []);
  }
  return (
    <>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo todo={todo} SetSelectedTodo={SetSelectedTodo} />
        ))}
      </div>
      {addNew && <Addtodos setTodos={setTodos} />}
      <div className="handlers">
        <Button handleClick={handleClick}>
          {addNew ? "Close" : "Add New"}
        </Button>
        {todos.length > 0 && (
          <Button handleClick={clearList}> Clear All</Button>
        )}
      </div>
    </>
  );
}

export default Todolist;
