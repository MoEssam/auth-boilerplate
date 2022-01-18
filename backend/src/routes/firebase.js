const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const middleware = require("../middleware/firebase-auth");

router.post("/login", middleware.decodeToken, async (req, res) => {
  const googleUser = {
    google: {
      email: req.user.email,
      profilePicture: req.user.picture,
      name: req.user.name,
      googleId: req.user.sub,
    },
  };
  try {
    const user = await User.findByEmail(req.user.email);
    if (user == null) {
      const newGoogleUser = new User(googleUser);
      await newGoogleUser.save();
      res.status(201).send({ newGoogleUser });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.get("/private", middleware.decodeToken, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
