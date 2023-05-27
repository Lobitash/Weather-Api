const mongoose = require('mongoose');
// const slugify = require('slugify');

const cityName = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

const CurrentCityName = mongoose.model(
  'city names',
  cityName
);
module.exports = CurrentCityName;
