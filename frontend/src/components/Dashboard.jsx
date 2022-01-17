import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ token }) {
  const [todos, setTodo] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get("/todos", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!data.data.todos) {
          setIsFetching(true);
        } else {
          setIsFetching(false);
          var result = data.data.todos.map((e) => e.title);
          setTodo(result);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [token]);

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
        <h1>fetching data please wait</h1>
      )}
    </div>
  );
}
