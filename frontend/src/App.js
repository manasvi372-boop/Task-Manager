import { useEffect, useState } from "react";
import { getTasks } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">Task Manager</h1>
        <p className="text-muted">Manage your daily tasks efficiently</p>
      </div>

      <input
        className="form-control mb-4"
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        <div className="col-md-4">
          <TaskForm refresh={fetchTasks} />
        </div>

        <div className="col-md-8">
          <TaskList tasks={filteredTasks} refresh={fetchTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;