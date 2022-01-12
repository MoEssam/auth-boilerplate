import * as React from "react";
import "./app.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar myStorage={myStorage} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard myStorage={myStorage} />}
        />
        <Route
          path="/"
          element={
            <div>
              {currentUser ? (
                <button className="button logout" onClick={handleLogout}>
                  Log Out
                </button>
              ) : (
                <div className="buttons">
                  <button
                    className="button login"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                  <button
                    className="button register"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </button>
                </div>
              )}
              {showRegister && <Register setShowRegister={setShowRegister} />}
              {showLogin && (
                <Login myStorage={myStorage} setCurrentUser={setCurrentUser} />
              )}
            </div>
          }
        />
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
