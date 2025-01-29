const Device = require("../models/device");

module.exports.findAll = async (req, res) => {
  try {
    const devices = await Device.findAll();
    return res.status(200).send(devices);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(JSON.parse("Error while retrieving all devices"));
  }
};

module.exports.findOneByUuid = async (req, res) => {
  const { uuid } = req.params;
  try {
    const device = await Device.findByUuid(uuid);
    return res.status(200).send(device);
  } catch (err) {
    console.log(err);

    const wasNotFound = err.message === "not_found";
    const status = wasNotFound ? 404 : 500;
    const message = wasNotFound
      ? "Device not found."
      : err.message || "Error while retrieving device by uuid.";

    return res.status(status).send({ message });
  }
};

module.exports.create = async (req, res) => {
  try {
    const {
      uuid,
      isVirtual,
      model,
      operatingSystem,
      osVersion,
      platform,
      webViewVersion,
      manufacturer,
    } = req.body;

    const device = new Device({
      uuid,
      isVirtual,
      model,
      operatingSystem,
      osVersion,
      platform,
      webViewVersion,
      manufacturer,
    });

    const createdDevice = await Device.create(device);
    return res.status(201).send(createdDevice);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(JSON.parse("Error while creating device by id."));
  }
};
