const express = require('express');
const userController = require('../controllers/user.controllers');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

module.exports = router;

