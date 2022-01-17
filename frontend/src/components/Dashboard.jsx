import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ token }) {
  const [todos, setTodo] = useState("");

  useEffect(() => {
    (async () => {
      const data = await axios.get("/todos", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      var result = data.data.todos.map((e) => e.title);
      console.log(result);
      setTodo(result);
    })();
  }, [token]);

  return (
    <div>
      <h1>List of todo</h1>
      <ol>{todos}</ol>
    </div>
  );
}
