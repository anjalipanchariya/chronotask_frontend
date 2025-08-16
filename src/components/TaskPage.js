import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Task from "../components/Task";

function TaskPage() {
  const { date } = useParams();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/tasks/${date}`)
      .then(res => {
        // console.log("Fetched tasks:", res.data);
        setTasks(res.data)
      })
      .catch(err => console.error(err));
  }, [date]);

  const handleAddTask = () => {
    console.log("clicked");
    setTasks([...tasks, {
      id: null,
      description: "",
      isCompleted: false,
      date: date
    }]);
  };

  const handleDeleteTask = async (task) => {

    if (task.id !== null && task.id !== undefined) {
      try {
        axios.delete(`http://localhost:8080/api/tasks/${task.id}`);
        setTasks(tasks.filter(t => task.id !== t.id));
        console.log("The task with id ", task.id, " was deleted ");
      }
      catch (error) {
        console.log("The task was not deleted ", error)
      }
    }

    else {
      setTasks(tasks.filter(t => task.id !== t.id));
    }
  }

  const handleChangeTask = async (id, newDesc, isCompleted = undefined) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
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
      console.log("No valid tasks to save");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/tasks", tasks, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Tasks saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving tasks:", error);
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
      await axios.patch(`http://localhost:8080/api/tasks/${id}/status?isCompleted=${updatedTask.isCompleted}`);
      console.log(`Task ${id} marked as completed`);

    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  return (
    <div className="taskPage">
      <h2>Tasks for {date}</h2>
      <Button style={{ margin: "1rem" }} variant="info" onClick={handleAddTask}>+</Button>
      {tasks
        .map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onChangeText={handleChangeTask}
            onCompleteTask={handleCompleteTask} />
        ))
      }
      <Button variant="info" onClick={handleSaveTask} >Save</Button>
    </div>
  );
};

export default TaskPage;
