const Categoty = require('../models/modelCategory');
const Toy=require('../models/toySchema')
const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find().populate('toys');
      res.send(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
   const createCategory = async (req, res,next) => {
    const category = new Category({
      name: req.body.name,
      toys: req.body.toys
    });
  
    try {
      const newCategory = await category.save();
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    next() 
  };
  
  module.exports = {
    getAllCategories,
    createCategory
  };
  
  