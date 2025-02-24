const express = require('express');
const UserProfileController = require('../controllers/user-profile');

const router = express.Router();

router.get('/', UserProfileController.findAll);

router.get('/:uuid', UserProfileController.findOneByUuid);

router.post('/', UserProfileController.create);

router.patch('/', UserProfileController.update);

module.exports = router;
