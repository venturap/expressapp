const Mammal = require("./../models/mammalModel");

exports.allMammals = async (req, res) => {
  const allMammals = await Mammal.find();

  res.json({
    status: "success",
    data: allMammals,
  });
};
exports.getMammal = async (req, res) => {
  const id = req.params.id;
  const mammal = await Mammal.findById(id);

  res.json({
    status: "success",
    data: mammal,
  });
};
exports.createMammal = async (req, res) => {
  const newMammal = await new Mammal(req.body);

  newMammal._id = Mammal.length + 1;
  const mammal = await newMammal.save();

  res.json({
    status: "success",
    data: mammal,
  });
};
exports.deleteMammal = async (req, res) => {
  const id = req.params.id;
  const mammal = await Mammal.findByIdAndDelete(id);
  if (mammal) {
    res.json({
      status: "success",
      data: mammal,
    });
  } else {
    res.status(404).json({
      status: "error",
      data: "not found",
    });
  }
};
exports.updateMammal = async (req, res) => { 
  const id = req.params.id;
  const mammal = await Mammal.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (mammal) {
    res.json({
      status: "success",
      data: mammal,
    });
  }else
  {
    res.status(404).json({
      status: "error",
      data: "not found",
    });
  }
};
