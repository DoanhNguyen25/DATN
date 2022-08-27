const express = require("express");
const router = new express.Router();
const { Product } = require("../models/Product");
const auth = require("../middleware/auth");
const { APIfeatures } = require("../lib/features");
const { Comment } = require("../models/Product");

// create product
router.post(
  "/api/create",
  auth.verifyTokenAndAuthorization,
  async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(201).send(newProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
// get products
// paggination
// sort
// search
router.get("/api/products", async (req, res) => {
  try {
    const features = new APIfeatures(Product.find(), req.query)
      .paginating()
      .sorting()
      .searching();

    const products = await features.query;
    const total = await Product.countDocuments();

    res.status(200).send({
      products: products,
      page: features.queryString.page || 1,
      page_size: features.queryString.size * 1 || 3,
      totalRows: total,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get product by id
router.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get product by category
router.get("/api/product2/:categoryId", async (req, res) => {
  const total = await Product.countDocuments({
    categories: req.params.categoryId,
  });

  try {
    const features = new APIfeatures(
      Product.find({ categories: req.params.categoryId }),
      req.query,
      req.params
    )
      .sorting()
      .paginating()
      .filtering();
    const product = await features.query;
    if (!product) {
      res.status(401).send({ message: "Products not found!!" });
    }
    res.status(200).send({
      products: product,
      page: features.queryString.page || 1,
      page_size: features.queryString.size * 1 || 2,
      totalRows: total,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update product
router.patch("/api/product/:id", auth.verifyToken, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "desc",
    "listImg",
    "categories",
    "size",
    "color",
    "price",
    "quantityInStock",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).send();
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.status(200).send({ message: "cập nhật thành công!!!", product });
  } catch (error) {
    res.status(500).send(error);
  }
});

// api delete

router.delete(
  "/api/product/:productId",
  auth.verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete({
        _id: req.params.productId,
      });
      await Comment.deleteMany({ product: req.params.productId });

      if (!product) {
        res.status(404).send();
      }

      res.send(product);
    } catch (e) {
      res.status(500).send();
    }
  }
);

// get comment
router.get("/api/comments", auth.verifyToken, async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// add comment
router.post("/api/comment/:id", auth.verifyToken, async (req, res) => {
  const { comment } = req.body;
  try {
    const product = await Product.findById(req.params.id);

    const review = {
      owner: req.user.id,
      comment,
      name: req.user.username,
      product: req.params.id,
    };
    if (product) {
      const newComment = await Comment.create(review);
      await newComment.save();
      product.reviews.push(review);
      await product.save();
      res
        .status(200)
        .send({ message: "comment success!", comment: newComment });
    } else {
      return res.status(404).send({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete comment
router.delete("/api/comment/:commentId", auth.verifyToken, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const commentSelected = await Comment.findOne({ commentId });
    const productPresent = await Product.findById(commentSelected.product);
    // console.log(productPresent);
    let commentIndex = 0;
    for (let i = 0; i < productPresent.reviews.length; i++) {
      if (productPresent.reviews[i].comment === commentSelected.comment) {
        commentIndex = i;
      }
    }
    if (commentIndex > -1) {
      productPresent?.reviews.splice(commentIndex, 1);
      await commentSelected.remove();
      await productPresent.save();
      return res.status(200).send({ message: "xóa bình luận thành công!!" });
    } else {
      return res
        .status(400)
        .send({ message: "xóa bình luận không thành công!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
