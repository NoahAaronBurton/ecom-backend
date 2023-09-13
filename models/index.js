// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// * each Product record has a foreign key (category_id) 
//* that references a Category.
Product.belongsTo(Category, {
  foreignKey: 'category_id', //* A foreign key is a column in one table that references the primary key of another table.
});

//* allows for fetching all the products belonging to a category.
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

//* allowing you to associate multiple tags with a product
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey : 'product_id',
  otherKey: 'tag_id',
  onDelete: 'CASCADE',
});

//* enabling you to associate multiple products with a tag
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  otherKey: 'product_id',
  onDelete: 'CASCADE',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
