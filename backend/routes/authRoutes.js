const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth/authController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../midleware/auth');
const registerSchema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
    mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(20).required(),
    mail: Joi.string().email().required(),
});

router.post('/register',validator.body(registerSchema), authControllers.controllers.postRegister);

router.post('/login',validator.body(loginSchema),authControllers.controllers.postLogin);

router.get('/test', auth, (req, res) =>{
    res.send('ok');
});

module.exports = router;