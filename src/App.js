import './App.css';
import Calendar from './components/Calendar'
import TaskPage from './components/TaskPage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/tasks/:date" element={<TaskPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
