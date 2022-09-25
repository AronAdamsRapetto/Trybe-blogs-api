const express = require('express');
const { postController } = require('../controllers');
const authUser = require('../middlewares/authUser.middleware');

const router = express.Router();

router.post('/', authUser, postController.registerPost);

router.get('/search', authUser, postController.searchPost);

router.get('/', authUser, postController.getAllPosts);

router.get('/:id', authUser, postController.getPostById);

router.put('/:id', authUser, postController.updatePost);

router.delete('/:id', authUser, postController.removePost);

module.exports = router;