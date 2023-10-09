const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const cors = require("cors");
const PORT = 3000;
let db;

const app = express();
app.use(cors());

app.use(express.json());

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (err) => {
      err ? console.log(err) : console.log("server running");
    });
    db = getDb();
  } else {
    console.log("server not listening");
  }
});

app.get("/coffe-shop", (req, res) => {
  const shopes = [];
  db.collection("shop")
    .find()
    .sort({ title: 1 })
    .forEach((element) => {
      shopes.push(element);
    })
    .then(() => {
      res.status(200).json(shopes);
    });
});

app.get("/coffe-shop/:id", (req, res) => {
  db.collection("shop")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.delete("/coffe-shop/:id", (req, res) => {
  db.collection("shop")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((ressult) => {
      res.status(200).json(ressult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});
app.post("/coffe-shop", (req, res) => {
  db.collection("shop")
    .insertOne(req.body)
    .then((ressult) => {
      res.status(201).json(ressult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/coffe-shop/:id", (req, res) => {
  db.collection("shop")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});
