import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import fire from "./firebase.js";
import FirebaseGoogle from "./components/Firebase";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoading(false) : setIsLoading(true);
  });

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      fire
        .auth()
        .currentUser.getIdToken()
        .then((data) => setToken(data));
      setIsLoading(false);
    } else {
      setIsLoading(true);

      console.log("onAuthStateChanged else");
    }
  });

  return (
    <BrowserRouter>
      <Navbar myStorage={myStorage} setCurrentUser={setCurrentUser} />
      <Routes>
        {!isLoggedIn && !isLoading ? (
          <Route path="/" element={<FirebaseGoogle />} />
        ) : (
          <Route path="/dashboard" element={<Dashboard token={token} />} />
        )}

        <Route path="/" element={<h1>Hello Moe</h1>} />
        <Route path="/firebase" element={<FirebaseGoogle />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
