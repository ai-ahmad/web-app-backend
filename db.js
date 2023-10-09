const { MongoClient } = require("mongodb");

const DB_URL = "mongodb://localhost:27017/coffe-shop";

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(DB_URL)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch();
  },
  getDb: () => dbConnection,
};
