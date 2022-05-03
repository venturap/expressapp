const express = require("express");
const mongoClient = require("mongodb").MongoClient;

const router = express.Router();
const allAnimals = (req, res) => {
    mongoClient.connect("mongodb://localhost:27017", (err, client) => {
      if (err) throw err;
      const db = client.db("animals");
      console.log(req.params);
      db.collection("mammals")
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          //console.log(result.length);
          res.status(200).json(result);
          client.close();
        });
    });
};
const getAnimal = (req, res) => {
    mongoClient.connect("mongodb://localhost:27017", (err, client) => {
      if (err) throw err;
      const db = client.db("animals");
      console.log(req.params.id);
      db.collection("mammals")
        .find({ _id: req.params.id * 1 })
        .toArray((err, result) => {
          if (err) throw err;
          res.status(200).json(result);
          client.close();
        });
    });
};
const createAnimal = async (req, res) => {
    const client = await mongoClient.connect("mongodb://localhost:27017");
    const db = client.db("animals");
    const count = await db.collection("mammals").countDocuments();
    req.body._id = count + 1;
    const result = await db.collection("mammals").insertOne(req.body);
    res.status(201).json([result, req.body, {"totalDocuments": count + 1}]);
    client.close();
};
const deleteAnimal = async (req, res) => {
    const client = await mongoClient.connect("mongodb://localhost:27017");
    const db = client.db("animals");
    const result = await db.collection("mammals")
    .deleteOne({ _id: req.params.id * 1 });
    if(result.deletedCount === 0) {
      res.status(404).json({"error": "Animal not found"});
    }
    else{
      console.log("deleted: " + result.deletedCount);
      res.status(204).json();
    }
};
const updateAnimal = async (req, res) => {
    const client = await mongoClient.connect("mongodb://localhost:27017");
    const db = client.db("animals");
    const result = await db.collection("mammals").updateOne(
      { _id: req.params.id * 1 },
      { $set: req.body }
    );
    res.json([result, req.body]);
    client.close();
  
};

router
    .route("/")
    .get(allAnimals)
    .post(createAnimal);

router
    .route("/:id")
    .get(getAnimal)
    .delete(deleteAnimal)
    .patch(updateAnimal);

module.exports = router;