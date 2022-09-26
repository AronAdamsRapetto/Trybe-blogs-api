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

  const { type, message } = await postService.getPostById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const updatePost = async (req, res) => {
  const { user, body } = req;
  const { id } = req.params;

  const { type, message } = await postService.updatePost(body, id, user);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const removePost = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const { type, message } = await postService.removePost(id, user);
  
  if (type) return res.status(type).json({ message });
  return res.status(204).json();
};

const searchPost = async (req, res) => {
  const { q } = req.query;

  const { type, message } = await postService.searchPost(q);

  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  registerPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
  searchPost,
};