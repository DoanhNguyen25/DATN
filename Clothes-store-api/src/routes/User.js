const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = new express.Router();
const { upload } = require("../utils/updloadfile/upload");
const { cloudinary } = require("../utils/storage/cloudinary");
const { mailTransporter } = require("../utils/email/sendmail");
const { Comment } = require("../models/Product");

// create user
router.post("/api/user/create", upload.single("image"), async (req, res) => {
  const { username, email, isAdmin, password, fullname, isActive, phone } =
    req.body;
  const urlImg = await cloudinary.uploader.upload(req.file.path);

  const newUser = new User({
    username,
    email,
    isAdmin,
    password,
    avatar: urlImg.secure_url,
    fullname,
    phone,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
// api get list user
router.get("/api/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (error) {}
});

// api get user by Id
router.get("/api/user/:id", auth.verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(400).send("User can not found!!!");
    }

    res.status(200).send(user.toJSON());
  } catch (error) {
    res.status(500).send(error);
  }
});

// api edit user
router.patch("/api/user/:id", upload.single("image"), async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password", "isAdmin", "image"];
  let urlImg;
  if (req.file) {
    urlImg = await cloudinary.uploader.upload(req.file.path);
  }

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send("user does not exist!!!");
    }

    const data = {
      username: req.body.username || user.username,
      password: req.body.password || user.password,
      email: req.body.email || user.email,
      isAdmin: req.body.isAdmin || user.isAdmin,
      avatar: req.file ? urlImg?.secure_url : user.avatar,
    };

    await User.findByIdAndUpdate({ _id: req.params.id }, data, { new: true });
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

// api delete user
router.delete("/api/remove/user/:id", auth.verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });

    if (!user) {
      res.status(404).send("User does not exist!!!");
    }
    await Comment.deleteMany({ owner: req.user._id });

    res.status(200).send({ mesage: "xóa thành công" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// api send mail
router.post("/api/sendmail", async (req, res) => {
  const { email } = req.body;

  await mailTransporter.sendMail(
    {
      from: "crishnguyen25@gmail.com",
      to: `${email}`,
      subject: "testing out nodemailer",
      text: "the first email sended by nodemailer",
      html: "<b>Hello world?</b>",
    },
    (err) => {
      if (err) {
        res.status(400).send({ mesage: "lỗi", err });
      } else {
        res.status(200).send({ message: `Gửi thành công tới ${email}` });
      }
    }
  );
});

// api get stats user
router.get("/api/stats", auth.verifyTokenAndAuthorization, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// upload img
router.post(
  "/api/upload/single",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.status(200).send({ url: result.secure_url });
    } catch (error) {
      res.send(error);
    }
  },
  (error, req, res, next) => {
    res.send({ message: error.message });
  }
);

// multiple img
router.post(
  "/api/upload/multiple",
  upload.array("listImage", 12),
  async (req, res) => {
    try {
      const listUrl = [];
      for (let i = 0; i < req.files.length; i++) {
        let result = await cloudinary.uploader.upload(req.files[i].path);
        listUrl.push(result.secure_url);
      }
      res.status(200).send(listUrl);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  (error, req, res, next) => {
    res.send({ message: error.message });
  }
);

module.exports = router;
