const express = require('express');
const { postController } = require('../controllers');
const authUser = require('../middlewares/authUser.middleware');

const router = express.Router();

router.post('/', authUser, postController.registerPost);

module.exports = router;