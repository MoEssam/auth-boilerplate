const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const auth = require("../middleware/auth");
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
      to: user.email,
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

  if (user.verified) return res.send("This user is already verified");

  const token = await VerificationToken.findOne({ owner: user._id });

  if (!token) return res.send("User not found");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return res.send("please provide valid token");

  user.verified = true;
  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  mailTransport().sendMail({
    to: user.email,
    from: "emailverification@email.com",
    subject: "Email verified",
    html: "Thanks for verification",
  });
  res.json({ success: true, message: "your email is verified" });
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

router.get("/private", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
