import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar myStorage={myStorage} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard myStorage={myStorage} />}
        />
        <Route path="/" element={<div>This is the Homepage</div>} />
        <Route
          path="/login"
          element={
            <Login myStorage={myStorage} setCurrentUser={setCurrentUser} />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
