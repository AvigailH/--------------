 const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  toys: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Toy'
  }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
