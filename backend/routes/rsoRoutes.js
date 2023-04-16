const express = require('express');
const router = express.Router();
const rsoController = require('../controllers/rsoController');
const verify = require("../middleware/verify")

router.route("/approved")
    .post(rsoController.approved);
router.route("/unapproved")
    .post(rsoController.unapproved);
router.route('/getRSO')
    .post(rsoController.getRSO);
router.route('/create')
    .post(rsoController.create)
router.route('/join')
    .post(rsoController.join)
router.route('/leave')
    .post(rsoController.leave)
router.route('/edit')
    .post(rsoController.edit)
router.route('/remove')
    .post(rsoController.remove);
router.route('/student')
    .post(rsoController.student);

module.exports = router;