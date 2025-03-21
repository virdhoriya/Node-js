require("dotenv").config();
const path = require("path");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const { mongoConnect } = require("./util/database");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("67dcfb94880477cbc970491d")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((error) => console.log(error));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// using callback

mongoConnect(() => {
  app.listen(3000);
});

// using async/await

// const startServer = async () => {
//   try {
//     await mongoConnect();
//     app.listen(3000);
//   } catch (error) {
//     console.error("Failed to start the server:", error);
//   }
// };

// startServer();
