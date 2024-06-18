const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  prodDate: { type: Date, default: Date.now },
  minPlayers: { type: Number, min: 1 },
  ageRange: { type: Number },
  price: { type: Number, min: 1, max: 3000 },
  company: { type: String, minlength: 2 },
  gameGoals: [String],
  categoryId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

module.exports = mongoose.model('Toy', toySchema);
