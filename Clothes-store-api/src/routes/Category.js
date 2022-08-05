const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { Cart } = require("../models/Cart");
const { Category } = require("../models/Category");
const { Order } = require("../models/Order");
const { Product } = require("../models/Product");

// CREATE Category
router.post("/api/create-category", auth.verifyToken, async (req, res) => {
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    await category.save();
    res.status(201).send({ message: "tạo danh mục thành công." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET ORDER
router.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ key: "asc" });
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETE CATEGORY
// JUST ADMIN TO DO THAT
router.delete("/api/category/:id", auth.verifyToken, async (req, res) => {
  try {
    // const category = await Category.findById(req.params.id);
    const products = await Product.find({ categories: req.params.id });
    if (products.length > 0) {
      res.status(401).send({ message: "Không thể xóa danh mục." });
    } else {
      await Category.findByIdAndDelete({ _id: req.params.id });
      res.status(200).send({ message: "Xóa thành công!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// UPDATE Catego
// JUST ADMIN TO DO THAT
router.patch(
  "/api/category/:id",
  auth.verifyTokenAndAuthorization,
  async (req, res) => {
    const { category_name } = req.body;
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        res.status(404).send({ message: "Cập nhật không thành công!!." });
      } else {
        category.category_name = category_name;
        await category.save();
        res.status(200).send({ message: "Cập nhật thành công!." });
      }
    } catch (error) {
      res.status(200).send({ message: error.message });
    }
  }
);

module.exports = router;
