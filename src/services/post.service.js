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

if (!post) return { type: 404, message: 'Post does not exist' };
return { type: null, message: post };
};

const validateUser = async (userId, postId) => {
  const { type, message } = await getPostById(postId); 

  if (type) return { type, message };
  if (message.user.id !== userId) return { type: 401, message: 'Unauthorized user' };
  return { type: null, message: '' };
};

const updatePost = async ({ title, content }, id, { id: userId }) => {
  if (!title || !content) return { type: 400, message: 'Some required fields are missing' };

  const validation = await validateUser(userId, id);
  if (validation.type) return validation;

  const [isUpdated] = await BlogPost.update({ title, content }, {
    where: { id },
  });
  if (isUpdated) {
    const updatedPost = await getPostById(id);
    return updatedPost;
  }
  return { type: 500, message: 'Algo deu errado, tente novamente mais tarde!' };
};

const removePost = async (id, { id: userId }) => {
  const validation = await validateUser(userId, id);

  if (validation.type) return validation;

  const isRemoved = await BlogPost.destroy({ where: { id } });
  if (isRemoved) return { type: null, message: '' };
  return { type: 500, message: 'Algo deu errado' };
};

const searchPost = async (query) => {
if (!query) {
  const posts = await getAllPosts();
  return { type: null, message: posts };
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

return { type: null, message: posts };
};

module.exports = {
  registerPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
  searchPost,
};
