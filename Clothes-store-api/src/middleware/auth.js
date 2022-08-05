const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) res.status(401).send({ message: "token is invalid!!" });
      const userPresent = await User.findById({ _id: user._id });
      req.user = userPresent;
      next();
    });
  } else {
    res.status(401).send({ message: "You are not authenticated!" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send({ message: "You do not allowed to do that!!" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
};
