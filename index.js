const express = require("express");
const app = express();
const port = 3000;

const mammalsRouter = require("./routes/mammalsRouter.js");
const insectsRouter = require("./routes/insectsRouter.js");

app.use(express.json());

app.use("/mammals", mammalsRouter);
app.use("/insects", insectsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});