const express = require('express');
const prismaController = require('../db/prisma');
const router = express.Router();

router.post('/', prismaController.createUser);
router.get('/', prismaController.getUsers);

module.exports = router;

