const express = require("express");
const router = new express.Router();
const middleware = require("../middleware/firebase-auth");

router.get("/todos", middleware.decodeToken, async (req, res) => {
  //console.log(req.headers.authorization);
  console.log(req.user);
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
// var arr = [
//   {
//     id: 1,
//     name: "bill",
//   },
//   {
//     id: 2,
//     name: "ted",
//   },
// ];

// var result = arr.map((person) => ({ value: person.id, text: person.name }));
// console.log(result);
