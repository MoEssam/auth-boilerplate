const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    res.send({ user });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
