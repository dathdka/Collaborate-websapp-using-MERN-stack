const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../midleware/auth');
const friendInvitationController = require('../controllers/friendInvitation/friendInvitationController')
const invitationSchema = Joi.object({
    targetMailAddress: Joi.string().email().required(),
});

const invitationDecisionSchema = Joi.object({
    id: Joi.string().required(),
});

router.post('/invite',auth, validator.body(invitationSchema), friendInvitationController.controllers.postInvite);
router.post('/accept',auth, validator.body(invitationDecisionSchema), friendInvitationController.controllers.postAccept);
router.post('/reject',auth, validator.body(invitationDecisionSchema), friendInvitationController.controllers.postReject);
module.exports = router;