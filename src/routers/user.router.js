const express = require('express');
const { userController } = require('../controllers');
const verifyToken = require('../middlewares/authUser.middleware');

const router = express.Router();

router.post('/', userController.registerUser);

router.get('/', verifyToken, userController.getAllUsers);

router.get('/:id', verifyToken, userController.getUserById);

module.exports = router;