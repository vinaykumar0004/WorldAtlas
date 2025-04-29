const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: {
    common: String,
    official: String,
  },
  capital: [String],
  region: String,
  population: Number,
  flags: {
    png: String,
    svg: String,
  },
});

module.exports = mongoose.model('Country', CountrySchema);
