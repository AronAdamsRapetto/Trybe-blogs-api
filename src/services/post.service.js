const { BlogPost, Category, PostCategory, sequelize } = require('../models');

const verifyCategories = async (categoryIds) => {
  const results = await Promise.all(categoryIds.map(async (id) => Category.findByPk(id)));
  const categories = results.filter((result) => result)
    .map(({ dataValues }) => dataValues);
  
  if (categories.length === 0) return { type: 400, message: '"categoryIds" not found' };
  return categories.map(({ id }) => id);
};

const registerPost = async ({ title, content, categoryIds }, userId) => {
  if (!title || !content || !categoryIds) {
    return { type: 400, message: 'Some required fields are missing' };
  }
  const validCategoriesIds = await verifyCategories(categoryIds);
  if (validCategoriesIds.type) return validCategoriesIds;
  
  const result = await sequelize.transaction(async (t) => {
    const { dataValues } = await BlogPost.create({ title, content, userId }, {
      transaction: t,      
    });

  const postCategories = validCategoriesIds
    .map((id) => ({ categoryId: id, postId: dataValues.id }));

  await PostCategory.bulkCreate(postCategories, { transaction: t });
  return dataValues;
  });
  return { type: null, message: result };
};

module.exports = {
  registerPost,
};
