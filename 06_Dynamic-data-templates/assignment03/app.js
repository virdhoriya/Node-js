const express = require("express");
const path = require("path");
const app = express();

const { engine } = require("express-handlebars");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
  })
);
app.set("view engine", "hbs");
// app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const users = [];

app.get("/", (req, res, next) => {
  res.render("add-user", {
    pageTitle: "Add User",
  });
});

app.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "users",
    users: users,
    hasUsers: users.length > 0,
  });
});

app.post("/add-user", (req, res, next) => {
  users.push(req.body.username);
  console.log(users);
  res.redirect("/users");
});

app.use((req, res, next) => {
  res.redirect("/");
});

app.listen(3000);
