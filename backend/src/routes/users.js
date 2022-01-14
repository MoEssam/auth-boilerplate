const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
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
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/v1/auth/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const data = ticket.getPayload();
  try {
    const user = await User.findByEmail(data.email);
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/private", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
