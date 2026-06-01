import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login.jsx";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post("http://localhost:5000/tasks", {
        title,
        status: "Todo",
      });

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="container">
    <h1>Task Manager</h1>

    <div className="task-input">
      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>
    </div>

    <div className="board">

      <div className="column">
        <h2>Todo</h2>

        {tasks
          .filter((task) => task.status === "Todo")
          .map((task) => (
            <div className="task-card" key={task._id}>
              <p>{task.title}</p>

              <button
                onClick={() =>
                  updateStatus(task._id, "In Progress")
                }
              >
                Start
              </button>

              <button
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      <div className="column">
        <h2>In Progress</h2>

        {tasks
          .filter((task) => task.status === "In Progress")
          .map((task) => (
            <div className="task-card" key={task._id}>
              <p>{task.title}</p>

              <button
                onClick={() =>
                  updateStatus(task._id, "Done")
                }
              >
                Done
              </button>

              <button
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      <div className="column">
        <h2>Done</h2>

        {tasks
          .filter((task) => task.status === "Done")
          .map((task) => (
            <div className="task-card" key={task._id}>
              <p>{task.title}</p>

              <button
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>

    </div>
  </div>
);
}

export default App;