const express = require("express");

const app = express();

// Question 1 - 2
// app.use((req, res, next) => {
//   console.log("First Middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Second Middleware");
//   res.send("<h2>Assignment 1</h2>");
// });

// Question 3

app.use("/users", (req, res) => {
  console.log(req.originalUrl);
  res.send("<h2>Welcome Dear user to learning express.js</h2>");
});

app.use("/", (req, res) => {
  console.log(req.url);
  res.send("<h2>Express.js</h2>");
});

app.listen(3000);
