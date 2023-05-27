const mongoose = require('mongoose');
// const slugify = require('slugify');

const weatherSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  main: {
    temp: Number,
    feels_like: Number,
    temp_min: Number,
    temp_max: Number,
    humidity: Number,
  },
  weather: [
    {
      main: String,
      description: String,
    },
  ],

  date: {
    type: Date,
    default: Date.now(),
  },
});

const Weather = mongoose.model(
  'weathers',
  weatherSchema
);

module.exports = Weather;
