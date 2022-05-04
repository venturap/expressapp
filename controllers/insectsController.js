const mongoClient = require("mongodb").MongoClient;

exports.allInsects = (req, res) => {
    mongoClient.connect("mongodb://localhost:27017", (err, client) => {
      if (err) throw err;
      const db = client.db("animals");
      console.log(req.params);
      db.collection("insects")
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          //console.log(result.length);
          res.status(200).json(result);
          client.close();
        });
    });
};
exports.getInsect = (req, res) => {
    mongoClient.connect("mongodb://localhost:27017", (err, client) => {
      if (err) throw err;
      const db = client.db("animals");
      console.log(req.params.id);
      db.collection("insects")
        .find({ _id: req.params.id * 1 })
        .toArray((err, result) => {
          if (err) throw err;
          res.status(200).json(result);
          client.close();
        });
    });
};
exports.createInsect = async (req, res) => {
    const client = await mongoClient.connect("mongodb://localhost:27017");
    const db = client.db("animals");
    const count = await db.collection("insects").countDocuments();
    req.body._id = count + 1;
    const result = await db.collection("insects").insertOne(req.body);
    res.status(201).json([result, req.body, {"totalDocuments": count + 1}]);
    client.close();
};
exports.deleteInsect = async (req, res) => {
    const client = await mongoClient.connect("mongodb://localhost:27017");
    const db = client.db("animals");
    const result = await db.collection("insects")
    .deleteOne({ _id: req.params.id * 1 });
    if(result.deletedCount === 0) {
      res.status(404).json({"error": "Animal not found"});
    }
    else{
      console.log("deleted: " + result.deletedCount);
      res.status(204).json();
    }
};
exports.updateInsect = async (req, res) => {
    const client = await mongoClient.connect("mongodb://localhost:27017");
    const db = client.db("animals");
    const result = await db.collection("insects").updateOne(
      { _id: req.params.id * 1 },
      { $set: req.body }
    );
    res.json([result, req.body]);
    client.close();
  
};