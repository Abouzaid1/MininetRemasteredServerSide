const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller')

router.route('/').get( deviceController.getAllDevice).post(deviceController.addDevice)

module.exports = router;