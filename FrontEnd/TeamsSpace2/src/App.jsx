import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthForm from "./pages/Auth/AuthForm";
import WorkspacePage from "./pages/WorkspacePage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Authpage" element={<AuthForm />} />
          <Route path="/Workspace" element={<WorkspacePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
