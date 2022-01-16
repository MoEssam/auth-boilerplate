const mongoose = require("mongoose");
const validtaor = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    local: {
      username: {
        type: String,
        require: true,
        unique: true,
      },
      email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
          if (!validtaor.isEmail(value)) {
            throw new Error("Email is invalid!");
          }
        },
      },
      verified: {
        type: Boolean,
        default: false,
        required: true,
      },
      password: {
        type: String,
        //required: true,
        min: 6,
        trim: true,
        validate(value) {
          if (value.toLowerCase().includes("password")) {
            throw new Error('Password cannot contain "password"');
          }
        },
      },

      tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
    },
    google: {
      googleId: String,
      email: String,
      token: String,
      name: String,
      profilePicture: String,
    },
    facebook: {
      facebookId: String,
      email: String,
      name: String,
      profilePicture: String,
      token: String,
    },
  },
  { timestamps: true }
);

//Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("local.password")) {
    user.local.password = await bcrypt.hash(user.local.password, 8);
  }
  next();
});

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ "local.username": username });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.local.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.statics.findByEmail = async (email) => {
  const user = await User.findOne({ "local.email": email });
  if (!user) {
    console.log("Email not found");
  }
  return user;
};

//hide sensitive data like passwords and tokens
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.local.password;
  delete userObject.local.tokens;

  return userObject;
};

//generate token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "topsecret");

  user.local.tokens = user.local.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
