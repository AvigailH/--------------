const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authorization').auth;
const {createToken, auth} =require("../middelwares/autorition")

router.post('/login', auth,userController.login);
router.post('/create', auth,userController.createUser);

module.exports = router;
