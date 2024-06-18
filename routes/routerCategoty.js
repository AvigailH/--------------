 const express = require('express');
const router = express.Router();
const controllerCategory = require('../controllers/controllerCategory');
const {createToken, auth} =require("../middelwares/autorition")

router.get('/', controllerCategory.getAllCategories);
router.post('/',createToken, controllerCategory.createCategory);

module.exports = router;
