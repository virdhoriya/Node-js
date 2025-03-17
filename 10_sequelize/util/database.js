const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-database", "root", "Vir@2003", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;