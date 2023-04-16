const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const verify = require("../middleware/verify")

router.route('/create')
    .post(userController.create);
router.route('/login')
    .post(userController.login);
router.route('/edit')
    .post(userController.edit);
router.route('/remove')
    .post(userController.remove);

module.exports = router;
