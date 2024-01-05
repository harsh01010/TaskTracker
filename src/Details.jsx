import { useState } from "react";
import Button from "./Button";

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

export default Details;
