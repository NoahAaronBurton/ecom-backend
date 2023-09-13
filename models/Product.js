// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: { //! dont know how to test
      type: DataTypes.DECIMAL, //? add arguments for precision and scale
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Input must be a decimal number'
        }
      }
    }, 
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate : {
        isNumeric: {
          msg: 'Input must be an integer'
        }
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      // reference to category model id
      references: {
        // This references the `reader` model, which we set in `Reader.js` as its `modelName` property
        model: 'category',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
