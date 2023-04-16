const express = require('express')
const router = express.Router()
const eventController = require("../controllers/eventController")
const verify = require("../middleware/verify")

router.route('/create')
    .post(eventController.create);
router.route('/public')
    .post(eventController.public);
router.route('/private')
    .post(eventController.private);
router.route('/rso')
    .post(eventController.rso);
router.route('/approve')
    .post(eventController.approve);
router.route('/deny')
    .post(eventController.deny);
router.route('/edit')
    .post(eventController.edit);
router.route('/remove')
    .post(eventController.remove)

module.exports = router;