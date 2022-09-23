const postCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    }
  }, {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'id',
      otherKey: 'id',
      as: 'posts',
      through: PostCategory,
    });

    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'id',
      otherKey: 'id',
      as: 'categorys',
      through: PostCategory,
    });
  };

  return PostCategory;
}

module.exports = postCategoryModel;