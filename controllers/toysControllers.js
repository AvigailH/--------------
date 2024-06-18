const Toy = require('../models/toySchema');
const Category = require('../models/modelCategory');

const getAllToys = async (req, res) => {
  const toys = await Toy.find();
  res.send(toys);
};

const getToyById = async (req, res) => {
  const toy = await Toy.findById(req.params.id);
  if (!toy) return res.status(404).send('צעצוע לא נמצא');
  res.send(toy);
};

const addToy = async (req, res) => {
  try {
    const { categoryId, ...toyData } = req.body;
    const newToy = new Toy(toyData);
    await newToy.save();

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.toys.push(newToy._id);
    await category.save();

    res.send({ message: 'המשחק נוסף בהצלחה', toy: newToy });
  } catch (error) {
    res.status(500).json({ message: 'אופס נתקלנו בשיגאה!', error: error.message });
  }
};

const deleteToy = async (req, res) => {
  try {
    const toyId = req.params.id;
    const toy = await Toy.findById(toyId);
    if (!toy) {
      return res.status(404).json({ message: 'Toy not found' });
    }
    const category = await Category.findById(toy.categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const index = category.toys.indexOf(toyId);
    if (index > -1) {
      category.toys.splice(index, 1);
    }
    await category.save();
    await Toy.findByIdAndDelete(toyId);
    
    res.send({ message: 'המשחק נמחק בהצלחה' });
  } catch (error) {
    res.status(500).json({ message: 'אופסס נתקלנו בשגיאה במחיקה אנא נסה שוב מאוחר יותר', error: error.message });
  }
};

const deleteAllToys = async (req, res) => {
  await Toy.deleteMany({});
  res.send('כל הצעצועים נמחקו');
};

const updateToy = async (req, res) => {
  const updatedToy = await Toy.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedToy) return res.status(404).send('צעצוע לא נמצא');
  res.send(updatedToy);
};

const getToysByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const toys = await Toy.find({ price: { $gte: minPrice, $lte: maxPrice } });
  res.send(toys);
};

const getToysByName = async (req, res) => {
  const { name } = req.query;
  const toys = await Toy.find({ name: { $regex: `.*${name}.*` } });
  res.send(toys);
};

module.exports = {
  getAllToys,
  getToyById,
  addToy,
  deleteToy,
  deleteAllToys,
  updateToy,
  getToysByPrice,
  getToysByName
};
