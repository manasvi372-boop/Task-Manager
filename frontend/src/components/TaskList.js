import { deleteTask, updateTask } from "../services/api";

export default function TaskList({ tasks, refresh }) {

  const handleDelete = async (id) => {
    await deleteTask(id);
    refresh();
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    await updateTask(task._id, { status: newStatus });
    refresh();
  };

  const handleEdit = async (task) => {
    const newTitle = prompt("Edit title", task.title);
    if (!newTitle) return;

    await updateTask(task._id, { title: newTitle });
    refresh();
  };

  return (
    <div>
      {tasks.length === 0 && (
        <p className="text-muted text-center">No tasks found</p>
      )}

      {tasks.map(task => (
        <div key={task._id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5>{task.title}</h5>
            <p className="text-muted">{task.description}</p>

            <p>
              Due: {task.dueDate ? new Date(task.dueDate).toDateString() : "N/A"}
            </p>

            <span className={`badge ${
              task.status === "Completed" ? "bg-success" : "bg-warning"
            }`}>
              {task.status}
            </span>

            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() => toggleStatus(task)}
              >
                Toggle
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}