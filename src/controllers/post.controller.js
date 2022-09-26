const { postService } = require('../services');

const registerPost = async (req, res) => {
  const { body, user } = req;

  const registeredPost = await postService.registerPost(body, user.id);
  return res.status(201).json(registeredPost);
};

const getAllPosts = async (_req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { user, body } = req;
  const { id } = req.params;

  const updatedPost = await postService.updatePost(body, id, user);
  return res.status(200).json(updatedPost);
};

const removePost = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  await postService.removePost(id, user);
  return res.status(204).json();
};

const searchPost = async (req, res) => {
  const { q } = req.query;

  const posts = await postService.searchPost(q);
  return res.status(200).json(posts);
};

module.exports = {
  registerPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
  searchPost,
};