import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthForm from "./pages/Auth/AuthForm";
import UsersPage from "./pages/UsersPage";
import { WorkspacePage } from "./pages/WorkspacePage";




const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Authpage" element={<AuthForm />} />
          <Route path="/Userspage" element={<UsersPage />} />
          <Route path="/Workspacepage" element={<WorkspacePage />} />
   
        </Routes>
      </Router>
    </>
  );
};

export default App;
