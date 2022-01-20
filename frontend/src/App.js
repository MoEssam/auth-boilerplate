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
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [token, setToken] = useState("");
  //const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unregisterAuthObserver = fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      setIsLoggedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  // fire.auth().onAuthStateChanged((user) => {
  //   return user
  //     ? (setIsLoggedIn(true), setIsLoading(false))
  //     : (setIsLoggedIn(false), setIsLoading(true));
  // });

  // useEffect(() => {
  //   const getIdTokenRefreshed = async () => {
  //     try {
  //       const user = fire.auth().currentUser;
  //       if (user) {
  //         const token = await user.getIdToken(true);
  //         // console.log(`Token: ${token}`);
  //         setToken(token);
  //         return token;
  //       } else {
  //         console.log("No user is logged in");
  //       }
  //     } catch (e) {
  //       console.log(`Something went wrong: ${e}`);
  //     }
  //   };
  //   console.log(isLoggedIn);
  //   getIdTokenRefreshed();
  // }, []);

  // if (isLoading) {
  //   return null;
  // }
  // token = { token };
  return (
    <BrowserRouter>
      <Navbar myStorage={myStorage} setCurrentUser={setCurrentUser} />
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Navigate to="/firebase" />} />
        ) : (
          <Route
            path="/"
            element={
              <div>
                <CircularProgress />
                <Navigate to="/dashboard" />
              </div>
            }
          />
        )}
        <Route path="/firebase" element={<FirebaseGoogle />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>no route hehe</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
