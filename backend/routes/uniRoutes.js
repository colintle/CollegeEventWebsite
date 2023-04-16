const express = require('express')
const router = express.Router()
const uniController = require('../controllers/uniController');
const verify = require("../middleware/verify")

router.route("/create")
    .post(uniController.create);
router.route('/get')
    .get(uniController.get);
router.route('/edit')
    .post(uniController.edit);
router.route('/remove')
    .delete(uniController.remove);

module.exports = router;