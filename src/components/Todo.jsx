import Button from "./Button";
import "../styles/Todo.css";
function Todo({ todo, SetSelectedTodo }) {
  function handleClick() {
    SetSelectedTodo(todo);
    console.log("hello");
    console.log(todo);
  }
  return (
    <div className={todo.state === "finished" ? "todo done" : "todo"}>
      <h3 className={todo.state === "finished" ? "center cross" : "center"}>
        {todo.heading[0].toUpperCase() + todo.heading.slice(1)}
      </h3>
      <div className="open">
        <Button handleClick={handleClick}>
          {todo.state === "finished" ? "Open✔" : "Open"}
        </Button>
      </div>
      <span>{"Added:" + todo.added}</span>
    </div>
  );
}

export default Todo;
