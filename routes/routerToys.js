const express = require('express');
const router = express.Router();
const toysController = require('../controllers/toysControllers');
const {createToken, auth} =require("../middelwares/autorition")

router.get('/', toysController.getAllToys);
router.get('/:id', toysController.getToyById);
router.post('/',createToken, toysController.addToy);
router.delete('/:id', createToken,toysController.deleteToy);
router.delete('/',createToken, toysController.deleteAllToys);
router.put('/:id', createToken,toysController.updateToy);
router.get('/byPrice', toysController.getToysByPrice);
router.get('/byName', toysController.getToysByName);

module.exports = router;
