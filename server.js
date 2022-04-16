const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const stripeRoute = require("./routes/stripeRoute");
const whishRoute = require("./routes/whishRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

//DB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connexion à la DB"))
  .catch((error) => console.log(error));

app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api", stripeRoute);
app.use("/api/whish", whishRoute);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
