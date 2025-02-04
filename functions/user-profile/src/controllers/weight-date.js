const WeightDate = require("../models/weight-date");

module.exports.findAllByUserProfileId = async (req, res) => {
  const { userProfileId } = req.params;

  try {
    const weightDates = await WeightDate.getAllByUserProfileId(userProfileId);
    return res.status(200).send(weightDates);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(JSON.parse("Error while retrieving all weightDates"));
  }
};

module.exports.create = async (req, res) => {
  try {
    const { weight, dateTime, userProfileId } = req.body;

    const weightDate = new WeightDate({
      weight,
      dateTime,
      userProfileId,
    });

    const createdWeightDate = await WeightDate.create(weightDate);
    return res.status(201).send(createdWeightDate);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(JSON.parse("Error while creating weight date by id."));
  }
};

module.exports.update = async (req, res) => {
  try {
    const { weight, dateTime, userProfileId } = req.body;

    const weightDate = new WeightDate({
      weight,
      dateTime,
      userProfileId,
    });

    const updatedWeightDate = await WeightDate.update(weightDate);
    return res.status(201).send(updatedWeightDate);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(JSON.parse("Error while updating weight date by id."));
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await WeightDate.delete(id);

    return res
      .status(200)
      .send({ message: "Weight Date removed successfully!" });
  } catch (err) {
    console.error(err);

    const wasNotFound = err.kind === "not_found";

    const status = wasNotFound ? 404 : 500;
    const message = wasNotFound
      ? "Weight Date not found."
      : err.message || "Error while deleting the Weight Date.";

    return res.status(status).send({ message });
  }
};
