const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { Cart } = require("../models/Cart");
const { Order } = require("../models/Order");

// CREATE ORDER
router.post("/api/create-order", auth.verifyToken, async (req, res) => {
  const { fullname, address, phone, email, status } = req.body;
  const cart = await Cart.findOne({ owner: req.user._id });

  try {
    if (!fullname || !address || !phone || !email) {
      res.status(400).send({ message: "Vui lòng nhập đủ thông tin." });
    } else {
      const order = new Order({
        userId: req.user._id,
        cartId: cart,
        products: cart.products,
        email: email,
        phone: phone,
        status: status,
        address: address,
        fullname: fullname,
      });

      await order.save();
      return res.status(201).send({ message: "Đặt hàng thành công!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET ORDER
router.get("/api/order", auth.verifyToken, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.user._id });
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: "không tồn tại đơn hàng!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETE ORDER
// JUST ADMIN TO DO THAT
router.delete("/api/order/:id", auth.verifyToken, async (req, res) => {
  const order = await Order.findById(req.params.id);
  try {
    if (!order) {
      res.status(404).send({ message: "Đơn hàng không tồn tại!!!" });
    } else if (order.status === 1 || order.status === 2) {
      res.status(401).send({
        message: "Không thể xóa đơn hàng đang giao hoặc đã thanh toán.",
      });
    } else {
      await order.remove();
      res.status(200).send({ message: "Xóa đơn hàng thành công!!" });
    }
  } catch (error) {
    res.status(200).send({ message: error.message });
  }
});

// UPDATE ORDER
// JUST ADMIN TO DO THAT
router.patch(
  "/api/order/:id",
  auth.verifyTokenAndAuthorization,
  async (req, res) => {
    const order = await Order.findById(req.params.id);
    try {
      if (!order) {
        res.status(404).send({ message: "Đơn hàng không tồn tại!!!" });
      } else if (order.status === 2) {
        res
          .status(401)
          .send({ message: "Không thể cập nhật đơn hàng đã thanh toán!!!" });
      } else {
        order.status = req.body.status;
        await order.save();
        res.status(200).send({ message: "cập nhật thành công", order });
      }
    } catch (error) {
      res.status(200).send({ message: error.message });
    }
  }
);

module.exports = router;
