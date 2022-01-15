const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const auth = require("../middleware/auth");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const { generateOTP, mailTransport } = require("../utils/mail");
const { isValidObjectId } = require("mongoose");

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  const OTP = generateOTP();

  const verificationToken = new VerificationToken({
    owner: user._id,
    token: OTP,
  });

  try {
    await verificationToken.save();
    await user.save();
    const token = await user.generateAuthToken();

    mailTransport().sendMail({
      to: user.local.email,
      from: "emailverification@email.com",
      subject: "Verify you email",
      html: `<h1>${OTP}</h1>`,
    });

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/verify-email", async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp.trim())
    return res.send("Invalid request, missing parameters");

  if (!isValidObjectId(userId)) return res.send("Invalid user id!");

  const user = await User.findById(userId);
  if (!user) return res.send("User is not found");

  if (user.local.verified) return res.send("This user is already verified");

  const token = await VerificationToken.findOne({ owner: user._id });

  if (!token) return res.send("User not found");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return res.send("please provide valid token");
  user.local.verified = true;
  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  mailTransport().sendMail({
    to: user.local.email,
    from: "emailverification@email.com",
    subject: "Email verified",
    html: "Thanks for verification",
  });
  res.json({ success: true, message: "your email is verified" });
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
