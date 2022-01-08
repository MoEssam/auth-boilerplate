import * as React from "react";
import "./app.css";
import { useState } from "react";
import Register from "./components/Register";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {currentUser ? (
        <button className="button logout">Log Out</button>
      ) : (
        <div className="buttons">
          <button className="button login">Login</button>
          <button
            className="button register"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      )}
      {showRegister && <Register setShowRegister={setShowRegister} />}
    </div>
  );
}

export default App;
