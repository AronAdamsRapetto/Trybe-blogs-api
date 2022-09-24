const express = require('express');
const { categoriesController } = require('../controllers');
const authUser = require('../middlewares/authUser.middleware');

const router = express.Router();

router.post('/', authUser, categoriesController.registerCategory);

module.exports = router;