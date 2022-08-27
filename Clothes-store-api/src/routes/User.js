const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = new express.Router();
const { upload } = require("../utils/updloadfile/upload");
const { cloudinary } = require("../utils/storage/cloudinary");
const { mailTransporter } = require("../utils/email/sendmail");
const { Comment, Product } = require("../models/Product");
const { Order } = require("../models/Order");
const bcrypt = require("bcryptjs");

// create user
router.post("/api/user/create", upload.single("image"), async (req, res) => {
  const { username, email, isAdmin, password, fullname, isActive, phone, role } =
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
    role
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

// api get user info
router.get("/api/user-profile", auth.verifyToken, async (req, res) => {
  try {
    const userProfile = await User.findOne({ _id: req.user._id });
    if (!userProfile) {
      return res.status(404).send({ message: "not found!!" });
    }
    return res.status(200).send(userProfile);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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
router.patch("/api/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "username",
    "email",
    "fullname",
    "isAdmin",
    "isActive",
    "avatar",
    "phone",
    "isActive",
    "password",
    "role",
  ];
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
    let encodePass = req.body.password
      ? await bcrypt.hash(req.body.password, 8)
      : "";

    const data = {
      username: req.body.username || user.username,
      fullname: req.body.fullname || user.fullname,
      email: req.body.email || user.email,
      isAdmin: req.body.isAdmin,
      isActive: req.body.isActive,
      role: req.body.role || user.role,
      avatar: req.body.avatar || user.avatar,
      phone: req.body.phone || user.phone,
      password: encodePass || user.password,
    };
    await User.findByIdAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });
    res.send(data);
  } catch (e) {
    res.status(400).send({ message: e.message });
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
      subject: "Đặt lại mật khẩu",
      text: "the first email sended by nodemailer",
      html: `<div style="color:red;font-size:12rem;width:100%;height:20rem;background:pink">
        <div style="width:70%; margin:0 auto; background:green">
          chào e a đứng đây từ chiều!!!
        </div>
      </div>`,
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

// api reset password
router.post("/api/reset-password", async (req, res) => {
  const { email } = req.body;

  const userInfo = await User.findOne({ email: email });
  await mailTransporter.sendMail(
    {
      from: "crishnguyen25@gmail.com",
      to: `${email}`,
      subject: "testing out nodemailer",
      text: "the first email sended by nodemailer",
      html: `<div style="
        width: 100%;
        background-color: gray;
        padding: 4rem 0;
      "
    >
      <div style="width:50%;margin:0 auto;background-color:white;padding:1rem;">
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid gray;
            padding-bottom: 1rem;
            align-items: center;
          "
        >
          <h2>Nguyễn Đình Doanh</h2>
          <h1>LAMA</h1>
        </div>
        <div
          style="
            width: 100%;
            margin-top: 1rem;
            border-bottom: 1px solid gray;
            padding-bottom: 2rem;
          "
        >
          <p>Dear, Doanh</p>
          <br />
          <p>
            Yêu cầu đặt lại mật khẩu đã được liên kết tới địa chỉ email này. Bạn
            có thể thay đổi mật khẩu theo đường dẫn dưới đây, có hiệu lực trong
            vòng 24 giờ:
          </p>

          <button
            style="
              border: none;
              outline: none;
              padding: 1rem;
              background-color: teal;
              margin-top: 2rem;
              border-radius: 0.5rem;
            "
          >
            <a
              href="http://localhost:3000/reset-pass?idReset=${userInfo._id}"
              style="color: #fff; text-decoration: none"
              >Đặt lại mật khẩu</a
            >
          </button>
        </div>
        <div style="width: 100%; height: 3rem; margin-top: 1rem">
          <p>Lama Store</p>
        </div>
      </div>
    </div>`,
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

// api update password
router.patch("/api/password/update", async (req, ress) => {
  const password = req.body;
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

// dashboad stasts

router.get("/api/dashboard", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const dataUser = await User.aggregate([
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
          totalUsers: { $sum: 1 },
        },
      },
    ]);

    const dataProduct = await Product.aggregate([
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
          totalProduct: { $sum: 1 },
        },
      },
    ]);

    const dataOrder = await Order.aggregate([
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
          totalOrder: { $sum: 1 },
        },
      },
    ]);

    const dataRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAmount: { $sum: "$bill" },
        },
      },
    ]);

    res.status(200).send({ dataUser, dataOrder, dataProduct, dataRevenue });
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
