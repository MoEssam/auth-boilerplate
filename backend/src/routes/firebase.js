const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const middleware = require("../middleware/firebase-auth");

router.post("/login", middleware, async (req, res) => {
  const user = await User.findByEmail(req.user.email);
  if (!user.localUser && !user.googleUser) {
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
      if (!user.localUser && !user.googleUser) {
        const newGoogleUser = new User(googleUser);
        await newGoogleUser.save();
        res.status(201).send({ newGoogleUser });
      }
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  } else {
    console.log("user already exists");
  }
});

router.get("/profile", middleware, async (req, res) => {
  try {
    const user = await User.findByEmail(req.user.email);
    if (!user.localUser && !user.googleUser) {
      res.status(404).send("No profile found");
    } else {
      console.log("Profile Found");
      res.send({
        email: req.user.email,
        profilePicture: req.user.picture,
        name: req.user.name,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
