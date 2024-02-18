import { useState } from "react";
import Button from "./Button";
import "../styles/Details.css";

import { doc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Details({ selectedTodo, todos, setTodos, handleClose, userId }) {
  const [newDetail, setNewDetail] = useState("");
  const [status, setStatus] = useState("pending");
  const [updating, setUpdating] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdating(true);
    // const empTodo = {
    //   ...selectedTodo,
    //   state: status,
    //   paragraph: newDetail !== "" ? newDetail : selectedTodo.paragraph,
    // };

    const tempTodo = {
      added: selectedTodo.added,
      heading: selectedTodo.heading,
      paragraph: newDetail !== "" ? newDetail : selectedTodo.paragraph,
      priority: selectedTodo.priority,
      state: status,
    };

    const deleteWithId = async (id) => {
      try {
        console.log(id);
        await deleteDoc(doc(firestore, `users/${userId}/todos/${id}`));
      } catch (e) {
        throw new Error("cannot Delete at this moment");
      }
    };
    const addNew = async (newTodo) => {
      try {
        const userTodoCollection = collection(
          firestore,
          `users/${userId}/todos`
        );
        await addDoc(userTodoCollection, newTodo);
      } catch (e) {
        console.error("cannot todo to the firestore, " + e.code);
      }
    };

    if (tempTodo.state === "delete") {
      // console.log(userId, "deleting");
      await deleteWithId(selectedTodo.id);
    } else {
      console.log(userId, "updating");
      await deleteWithId(selectedTodo.id);
      await addNew(tempTodo);
    }

    /*
    setTodos((e) =>
      e.map((curr) =>
        curr.id === selectedTodo.id
          ? {
              ...curr,
              state: status,
              paragraph: newDetail !== "" ? newDetail : curr.paragraph,
            }
          : curr
      )
    );
    */
    setUpdating(false);
    setNewDetail("");
    setStatus("pending");
    handleClose();
  }
  return (
    <div className="detail">
      <i class="fa-solid fa-3x fa-xmark" onClick={handleClose}></i>
      <p className="para">{selectedTodo.paragraph}</p>
      <hr />
      <div className="center-form">
        <form onSubmit={handleSubmit} className="detail-form">
          <div className="modify">
            <label>Modify Details:</label>
            <input
              type="text"
              placeholder="Enter new details..."
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
              className="inpadd"
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              className="inpadd"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={"pending"}>Pending🙅‍♀️</option>
              <option value={"finished"}>Finished✅</option>
              <option value={"delete"}>Delete 🗑🧹</option>
            </select>
          </div>
          <div className="center">
            <Button disabled={updating}>
              {updating ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Details;
