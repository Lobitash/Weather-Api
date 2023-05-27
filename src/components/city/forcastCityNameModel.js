const mongoose = require('mongoose');
// const slugify = require('slugify');

const cityName = new mongoose.Schema({
  city: {
    name: String,
  },
  country: String,
});

const ForcastCityName = mongoose.model(
  'Forcast city names',
  cityName
);
module.exports = ForcastCityName;
