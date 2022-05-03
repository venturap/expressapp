const express = require("express");

const mammalsRouter = require("./routes/mammals.js");
const insectsRouter = require("./routes/insects.js");

const app = express();
const port = 3000;
app.use(express.json());

//app.route("/animals").get(allAnimals).post(createAnimal);
//app.route("/animals/:id").get(getAnimal).delete(deleteAnimal).patch(updateAnimal);

//app.get("/animals", allAnimals);
//app.get("/animals/:id", getAnimal);
//app.post("/animals", createAnimal);
//app.patch("/animals/:id", updateAnimal);
//app.delete("/animals/:id", deleteAnimal);
app.use("/animals", mammalsRouter);
app.use("/insects", insectsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});