const express = require("express");
const SettingController = require("../controllers/setting");

const router = express.Router();

router.get("/:uuid", SettingController.findOneByUuid);

router.post("/", SettingController.create);

router.patch("/", SettingController.update);

module.exports = router;
