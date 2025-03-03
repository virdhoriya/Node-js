const express = require("express");
const path = require("path");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(userRoutes);

app.listen(3000);
