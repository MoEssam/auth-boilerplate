import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import fire from "./firebase.js";
import FirebaseGoogle from "./components/Firebase";
import Profile from "./components/Profile";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  fire.auth().onAuthStateChanged((user) => {
    return user
      ? (setIsLoggedIn(true), setIsLoading(false))
      : (setIsLoggedIn(false), setIsLoading(true));
  });

  useEffect(() => {
    return fire.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken(true)
          .then((latestToken) => setToken(latestToken))
          .catch((err) => console.log(err));
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navbar myStorage={myStorage} setCurrentUser={setCurrentUser} />
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Navigate to="/firebase" />} />
        ) : (
          <Route path="/" element={<Navigate to="/dashboard" />} />
        )}
        <Route path="/firebase" element={<FirebaseGoogle token={token} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
        <Route path="/profile" element={<Profile token={token} />} />
        <Route path="*" element={<h1>no route hehe</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
