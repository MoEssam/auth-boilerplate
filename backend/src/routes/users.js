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
      req.body.local.username,
      req.body.local.password
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
  const googleUser = {
    google: {
      email: data.email,
      profilePicture: data.picture,
      name: data.name,
      googleId: data.sub,
    },
  };
  try {
    const user = await User.findByEmail(data.email);
    if (user == null) {
      const newGoogleUser = new User(googleUser);
      await newGoogleUser.save();
      res.status(201).send({ newGoogleUser });
    } else {
      const linkGoogle = await User.findByIdAndUpdate(
        { _id: user._id },
        googleUser,
        {
          new: true,
        }
      );
      res.send(linkGoogle);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.get("/private", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
