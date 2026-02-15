import { Routes, Route, Navigate } from "react-router";
import AuthLayout from "./layouts/AuthLayout"
import TaskLayout from "./layouts/TaskLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";
import EntryTask from "./pages/EntryTask";

const App = () => {

  return (
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace   />}  />

        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/task" element={<TaskLayout/>}>
          <Route index element={<Task/>} />
          <Route path="entry" element={<EntryTask/>} />
          <Route path="update/:id" element={<EntryTask isEditMode />} />
          
        </Route>

        

      </Routes>
  )
}

export default App