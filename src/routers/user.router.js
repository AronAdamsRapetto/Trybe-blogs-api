const express = require('express');
const { userController } = require('../controllers');
const authToken = require('../middlewares/authUser.middleware');

const router = express.Router();

router.post('/', userController.registerUser);

router.get('/', authToken, userController.getAllUsers);

router.get('/:id', authToken, userController.getUserById);

module.exports = router;