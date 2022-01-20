import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import fire from "../firebase";

export default function Dashboard() {
  const [todos, setTodo] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fire
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        async function fetchProfile() {
          const data = await axios.get("/todos", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          if (!data.data.todos) {
            setIsFetching(true);
          } else {
            var result = data.data.todos.map((e) => e.title);
            setIsFetching(false);
            setTodo(result);
          }
        }
        fetchProfile();
      });
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     if (!token) {
  //       return null;
  //     } else {
  //       try {
  //         const data = await axios.get("/todos", {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         });
  //         if (!data.data.todos) {
  //           setIsFetching(true);
  //         } else {
  //           setIsFetching(false);
  //           var result = data.data.todos.map((e) => e.title);
  //           setTodo(result);
  //         }
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [token]);

  return (
    <div>
      Authentication System Dashboard
      {!isFetching && todos.length > 0 ? (
        <ol>
          {todos.map((reptile) => (
            <li key={reptile}>{reptile}</li>
          ))}
        </ol>
      ) : (
        <div>
          <CircularProgress />
        </div>
        // <h1>fetching data please wait</h1>
      )}
    </div>
  );
}
