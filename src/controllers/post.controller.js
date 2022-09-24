const { postService } = require('../services');

const registerPost = async (req, res) => {
  const { body, user } = req;

  const { type, message } = await postService.registerPost(body, user.id);

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  registerPost,
};