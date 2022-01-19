const admin = require("../utils/firebase-config");

const authFirebase = async (req, res, next) => {
  const token1 = req.header("Authorization");
  if (!token1) {
    return null;
  } else {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = await admin.auth().verifyIdToken(token);
      if (!decoded) {
        throw new Error();
      }
      req.user = decoded;
      req.token = token;
      next();
    } catch (e) {
      res.status(401).send({ error: "Please Authenticate" });
    }
  }
};

module.exports = authFirebase;
