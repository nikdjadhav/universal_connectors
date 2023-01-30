const express = require('express');
const userController = require('../controllers/user.controllers');
const router = express.Router();

router.post('/createUser', userController.createUser);
router.get('/getUsers', userController.getUsers);

module.exports = router;

