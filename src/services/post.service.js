const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User, sequelize } = require('../models');
const errorThrower = require('../utils/errorThrower');

const verifyCategories = async (categoryIds) => {
  const results = await Promise.all(categoryIds.map(async (id) => Category.findByPk(id)));
  const categories = results.filter((result) => result)
    .map(({ dataValues }) => dataValues);
  
  if (categories.length === 0) {
    errorThrower(400, '"categoryIds" not found');
  }
  return categories.map(({ id }) => id);
};

const registerPost = async ({ title, content, categoryIds }, userId) => {
  if (!title || !content || !categoryIds) {
    errorThrower(400, 'Some required fields are missing');
  }
  const validCategoriesIds = await verifyCategories(categoryIds);
  
  const result = await sequelize.transaction(async (t) => {
    const { dataValues } = await BlogPost.create({ title, content, userId }, {
      transaction: t,
    });

  const postCategories = validCategoriesIds
    .map((id) => ({ categoryId: id, postId: dataValues.id }));

  await PostCategory.bulkCreate(postCategories, { transaction: t });
  return dataValues;
  });
  return result;
};

const getAllPosts = async () => BlogPost.findAll({
  include: [
    {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
});

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
  where: { id },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],  
});

if (!post) errorThrower(404, 'Post does not exist');
return post;
};

const validateUser = async (userId, postId) => {
  const post = await getPostById(postId); 

  if (post.user.id !== userId) errorThrower(401, 'Unauthorized user');
};

const updatePost = async ({ title, content }, id, { id: userId }) => {
  if (!title || !content) errorThrower(400, 'Some required fields are missing');
  await validateUser(userId, id);

  await BlogPost.update({ title, content }, {
    where: { id },
  });

  const updatedPost = await getPostById(id);
  return updatedPost;
};

const removePost = async (id, { id: userId }) => {
  await validateUser(userId, id);
  await BlogPost.destroy({ where: { id } });
};

const searchPost = async (query) => {
if (!query) {
  const posts = await getAllPosts();
  return posts;
}

const posts = await BlogPost.findAll({
  where: {
    [Op.or]: [
      { title: { [Op.substring]: query } },
      { content: { [Op.substring]: query } },
    ],
  },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

return posts;
};

module.exports = {
  registerPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
  searchPost,
};
