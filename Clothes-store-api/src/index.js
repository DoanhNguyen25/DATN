const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const UserRoute = require("./routes/User");
const AuthRoute = require("./routes/Auth");
const ProductRoute = require("./routes/Product");
const CartRoute = require("./routes/Cart");
const OrderRoute = require("./routes/Order");
const CategoryRoute = require("./routes/Category");
const PaymentRoute = require("./routes/Payment");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Da ket noi co so du lieu");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(ProductRoute);
app.use(CartRoute);
app.use(OrderRoute);
app.use(CategoryRoute);
app.use(PaymentRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running ${process.env.PORT}`);
});
