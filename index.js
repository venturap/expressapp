const express = require("express");

const mammalsRouter = require("./routes/mammals.js");
const insectsRouter = require("./routes/insects.js");

const app = express();
const port = 3000;
app.use(express.json());

app.use("/mammals", mammalsRouter);
app.use("/insects", insectsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});