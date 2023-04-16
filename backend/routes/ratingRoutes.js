const express = require('express')
const router = express.Router()
const ratingController = require('../controllers/ratingController')
const verify = require("../middleware/verify")

router.route('/get')
    .post(ratingController.get)
router.route('/create')
    .post(ratingController.create)
router.route('/edit')
    .post(ratingController.edit)
router.route('/remove')
    .post(ratingController.remove)

module.exports = router