import { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";
import Details from "./Details";

function App() {
  const [selectedTodo, SetSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  function closeSelected() {
    SetSelectedTodo(null);
  }
  return (
    <div className="App">
      {!selectedTodo && (
        <>
          <h1>Task Swift</h1>
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

export default App;
