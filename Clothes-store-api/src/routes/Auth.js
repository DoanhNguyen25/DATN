const router = require("express").Router();
const User = require("../models/User");
const { upload } = require("../utils/updloadfile/upload");
const { cloudinary } = require("../utils/storage/cloudinary");
const e = require("express");

// Register

router.post("/api/register", async (req, res) => {
  const { username, email, password, fullname, isAdmin, phone, isActive } =
    req.body;

  const newUser = new User({
    username,
    email,
    isAdmin,
    password,
    avatar: "test",
    fullname,
    isActive,
    phone,
    role:2
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const access_token = await user.generateAuthToken();

    if (!user) {
      return res.status(401).send({ message: "User doesn't exist!!!" });
    }

    const { password, ...newUser } = user._doc;
    res.status(200).send({ ...newUser, access_token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
