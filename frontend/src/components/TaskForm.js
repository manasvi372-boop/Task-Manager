import { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("All fields required");
      return;
    }

    await createTask({ title, description, dueDate });

    setTitle("");
    setDescription("");
    setDueDate("");

    refresh();
  };

  return (
    <div className="card shadow-sm p-3">
      <h5>Add Task</h5>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="form-control mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="btn btn-primary w-100">Add Task</button>
      </form>
    </div>
  );
}