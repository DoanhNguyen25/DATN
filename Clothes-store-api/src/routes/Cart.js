const express = require("express");
const router = new express.Router();
const { Cart } = require("../models/Cart");
const { Product } = require("../models/Product");
const auth = require("../middleware/auth");

// get cart
router.get("/api/cart", auth.verifyToken, async (req, res) => {
  const owner = req.user._id;

  try {
    const cart = await Cart.findOne({ owner });
    if (cart && cart.products.length > 0) {
      res.status(200).send(cart);
    } else {
      res.status(404).send({ message: "cart not found!!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ADD TO CART
router.post("/api/add_to_cart", auth.verifyToken, async (req, res) => {
  const owner = req.user._id;
  const { productId, quantity, size, color } = req.body;

  try {
    const cart = await Cart.findOne({ owner });
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      res.status(404).send({ message: "product not found!!! " });
    }
    const price = product.price;
    const productName = product.title;
    if (cart) {
      const productIndex = cart.products.findIndex(
        (item) => item.productId == productId
      );

      if (quantity > product.quantityInStock) {
        return res.status(401).send({ message: "số lượng trong kho không đủ" });
      } else {
        product.quantityInStock -= quantity;
        await product.save();
      }

      if (productIndex > -1) {
        let productSelected = cart.products[productIndex];
        productSelected.quantity += quantity;
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity;
        }, 0);
        cart.products[productIndex] = productSelected;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.products.push({
          productId,
          productName,
          quantity,
          price,
          color,
          size,
          image: product.listImg[0],
        });
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      const newCart = await Cart.create({
        owner,
        products: [
          {
            productId,
            productName,
            quantity,
            price,
            color,
            size,
            image: product.listImg[0],
          },
        ],
        bill: quantity * price,
      });
      await product.save();
      return res.status(201).send(newCart);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETE ITEM FROM CART
router.delete("/api/remove/:id", auth.verifyToken, async (req, res) => {
  const owner = req.user._id;
  const productId = req.params.id;
  try {
    let cart = await Cart.findOne({ owner });
    const productIndex = cart.products.findIndex(
      (item) => item.productId == productId
    );

    if (productIndex > -1) {
      let product = cart.products[productIndex];
      cart.bill -= product.quantity * product.price;
      if (cart.bill < 0) {
        cart.bill = 0;
      }
      cart.products.splice(productIndex, 1);
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
      await cart.save();

      res.status(200).send({ message: "Xóa thành công!!!", cart });
    } else {
      res.status(404).send("product not found!!!");
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// remove all item in cart
router.delete("/api/removeAll", auth.verifyToken, async (req, res) => {
  try {
    const owner = req.user._id;
    let cart = await Cart.findOne({ owner });
    cart.products = [];
    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// UPDATE CART
router.patch("/api/cart/update", auth.verifyToken, async (req, res) => {
  const owner = req.user._id;
  const { productId, type } = req.body;
  try {
    const product = await Product.findOne({ _id: productId });
    let cart = await Cart.findOne({ owner });
    const productIndex = cart.products.findIndex(
      (item) => item.productId == productId
    );

    if (productIndex > -1) {
      let productSelected = cart.products[productIndex];
      productSelected.quantity =
        type === "minus"
          ? productSelected.quantity - 1
          : productSelected.quantity + 1;
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
      cart.products[productIndex] = productSelected;
      await cart.save();
      res.status(200).send({ message: "cập nhật thành công!!!", cart });
    } else {
      res.status(404).send({ message: "product not found!!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
