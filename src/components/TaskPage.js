import Button from 'react-bootstrap/Button';
import axios from "axios";
import Task from "../components/Task";
import Spinner from 'react-bootstrap/Spinner';
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function TaskPage() {
  const { date } = useParams();
  const API_BASE = "https://chronotask-backend.onrender.com";

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/tasks/${date}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [date]);

  const handleAddTask = () => {
    console.log("clicked");
    setTasks([...tasks, {
      id: null,
      tempId: uuidv4(),
      description: "",
      isCompleted: false,
      date: date,
      originalTaskId: null
    }]);
  };

  const handleDeleteTask = async (task) => {

    if (task.id !== null && task.id !== undefined) {
      try {
        axios.delete(`${API_BASE}/api/tasks/${task.id}`);
        setTasks(tasks.filter(t => task.id !== t.id));
        toast.success("Task deleted successfully");
        console.log("The task with id ", task.id, " was deleted ");
      }
      catch (error) {
        toast.error("Task deletion failed");
        console.log("The task was not deleted ", error)
      }
    }
    else {
      setTasks(tasks.filter(t => task.id !== t.id));
    }
  }

  const handleChangeTask = async (id, tempId, newDesc, isCompleted = undefined) => {
    const updatedTasks = tasks.map(task =>
      (task.id === id && id !== null) || (task.tempId && task.tempId === tempId)
        ? {
          ...task,
          description: newDesc ?? task.description,
          isCompleted: isCompleted !== undefined ? isCompleted : task.isCompleted
        }
        : task
    );
    setTasks(updatedTasks);
  }

  const handleSaveTask = async () => {
    const validTasks = tasks.filter(
      (task) => task.description && task.description.trim() !== ""
    );

    if (validTasks.length === 0) {
      toast.warn("No valid tasks to save");
      return;
    }
    try {
      setSaving(true);
      const response = await axios.post(`${API_BASE}/api/tasks`, validTasks, {
        headers: { "Content-Type": "application/json" },
      });
      const savedTasks = response.data;
      setTasks(savedTasks);
      toast.success("Tasks saved successfully");
      console.log("Tasks saved successfully:", response.data);
    } catch (error) {
      toast.error("Failed to save tasks");
      console.error("Error saving tasks:", error);
    }
    finally {
      setSaving(false);
    }
  };

  const handleCompleteTask = async (id) => {
    const taskToUpdate = tasks.find(t => t.id === id);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, isCompleted: !taskToUpdate.isCompleted };

    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? updatedTask : task))
    );
    try {
      await axios.patch(`${API_BASE}/api/tasks/${id}/status?isCompleted=${updatedTask.isCompleted}`);
      console.log(`Task ${id} marked as completed`);

    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  return (
    <div className="taskPage">
      <h2>Tasks for {date}</h2>
      {loading ? (
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <Spinner animation="border" variant="info" /> Loading tasks...
        </div>
      ) : (
        <>
          <Button style={{ margin: "1rem" }} variant="info" onClick={handleAddTask}>
            +
          </Button>

          {tasks.map((task) => (
            <Task
              key={task.id ?? task.tempId}
              task={task}
              onDelete={handleDeleteTask}
              onChangeText={handleChangeTask}
              onCompleteTask={handleCompleteTask}
            />
          ))}

          <Button variant="info" onClick={handleSaveTask} disabled={saving}>
            {saving ? <Spinner size="sm" animation="border" /> : "Save"}
          </Button>
        </>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default TaskPage;
