const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../midleware/auth');
const messageController = require('../controllers/message/messageController');

const messageSchema = Joi.object({
    id: Joi.string().required(),
});

router.post('/get-message', validator.body(messageSchema),messageController.controllers.getMessage);
module.exports = router;