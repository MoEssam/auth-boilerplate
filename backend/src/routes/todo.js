const express = require("express");
const router = new express.Router();
const middleware = require("../middleware/firebase-auth");

router.get("/todos", middleware, async (req, res) => {
  res.json({
    todos: [
      {
        title: "Task1",
      },
      {
        title: "Task2",
      },
    ],
  });
});

module.exports = router;
