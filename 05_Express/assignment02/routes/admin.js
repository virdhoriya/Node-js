const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h2>Assignment #2</h2>");
});

router.get("/admin", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin.html"));
});

module.exports = router;
