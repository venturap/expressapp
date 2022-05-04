const mongooose = require("mongoose");

mongooose.connect("mongodb://localhost:27017/animals").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => { 
  console.log("Error connecting to MongoDB: ", err.message);
});

const Schema = mongooose.Schema({
    _id: Number,
    legs: Number,
    species: String,
    //species: {type: String, required: true},
    fur: String
});

const Mammal = mongooose.model("Mammal", Schema);

module.exports = Mammal;