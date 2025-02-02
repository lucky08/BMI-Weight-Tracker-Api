const Setting = require("../models/setting");

module.exports.findOneByUuid = async (req, res) => {
  const { uuid } = req.params;
  try {
    const setting = await Setting.findByUuid(uuid);
    return res.status(200).send(setting);
  } catch (err) {
    console.log(err);

    const wasNotFound = err.message === "not_found";
    const status = wasNotFound ? 404 : 500;
    const message = wasNotFound
      ? "Setting not found."
      : err.message || "Error while retrieving setting by uuid.";

    return res.status(status).send({ message });
  }
};

module.exports.create = async (req, res) => {
  try {
    const { unit, darkMode, uuid } = req.body;

    const setting = new Setting({
      unit,
      darkMode,
      uuid,
    });

    const createdSetting = await Setting.create(setting);
    return res.status(201).send(createdSetting);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(JSON.parse("Error while creating setting by id."));
  }
};

module.exports.update = async (req, res) => {
  try {
    const { unit, darkMode, uuid } = req.body;

    const setting = new Setting({
      unit,
      darkMode,
      uuid,
    });

    const updatedSetting = await Setting.updateByUuid(setting);
    return res.status(201).send(updatedSetting);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(JSON.parse("Error while updating setting by id."));
  }
};
