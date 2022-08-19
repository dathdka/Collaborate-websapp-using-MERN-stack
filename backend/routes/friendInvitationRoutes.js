const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../midleware/auth');
const friendInvitationController = require('../controllers/friendInvitation/friendInvitationController')
const invitationSchema = Joi.object({
    targetMailAddress: Joi.string().email().required(),
});

router.post('/invite',auth, validator.body(invitationSchema), friendInvitationController.controllers.postInvite);

module.exports = router;