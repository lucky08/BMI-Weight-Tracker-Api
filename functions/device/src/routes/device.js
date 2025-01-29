const express = require("express");
const DeviceController = require("../controllers/device");

const router = express.Router();

router.get("/", DeviceController.findAll);

router.get("/:uuid", DeviceController.findOneByUuid);

router.post("/", DeviceController.create);

module.exports = router;
