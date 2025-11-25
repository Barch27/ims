const Joi = require('joi');

const inventoryValidator = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  sku: Joi.string().alphanum().min(3).max(15).required(),
  category: Joi.string().valid('Electronics', 'Furniture', 'Clothing', 'Food').required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(0).required(),
  createdBy: Joi.string().required()
});

module.exports = inventoryValidator;
