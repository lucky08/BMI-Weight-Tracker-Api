const express = require('express');
const WeightDateController = require('../controllers/weight-date');

const router = express.Router();

router.get('/all/:userProfileId', WeightDateController.findAllByUserProfileId);

router.post('/', WeightDateController.create);

router.patch('/', WeightDateController.update);

router.delete('/:id', WeightDateController.delete);

module.exports = router;
