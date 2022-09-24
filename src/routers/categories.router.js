const express = require('express');
const { categoriesController } = require('../controllers');
const authUser = require('../middlewares/authUser.middleware');

const router = express.Router();

router.post('/', authUser, categoriesController.registerCategory);

router.get('/', authUser, categoriesController.getAllCategories);

module.exports = router;