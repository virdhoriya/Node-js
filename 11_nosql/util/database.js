// Old way using the callback

const { MongoClient } = require("mongodb");

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      console.log("Connected successfully!");
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Databse Found !";
};

module.exports = { mongoConnect, getDb };

// Newer way using async/await

// const { MongoClient } = require("mongodb");

// let _db;

// const mongoConnect = async () => {
//   try {
//     const client = await MongoClient.connect(process.env.MONGO_URI);
//     console.log("Connected successfully!");
//     _db = client.db();
//   } catch (error) {
//     console.log("Failed to connect to MongoDb : ", error);
//     throw error;
//   }
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found!";
// };

// module.exports = { mongoConnect, getDb };
