import Button from "./Button";
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

export default Todo;
