import express from 'express';
import Product from '../models/ProductModels.js';
import data from '../data.js';
import User from '../models/UsersModel.js';

const seedRoutes = express.Router();

seedRoutes.get('/', async (req, res) => {
  await Product.remove({});
  const createProduct = await Product.insertMany(data.products);
  await User.remove({});
  const createUser = await User.insertMany(data.users);
  res.send({ createProduct, createUser });
});

export default seedRoutes;
