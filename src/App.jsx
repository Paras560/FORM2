import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserBoard from "./components/UserBoard";
function App() {
  return (
    <div>
      <ToastContainer />
      <Toaster position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userboard" element={<UserBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
