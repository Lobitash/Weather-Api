const mongoose = require('mongoose');

const dailyWeatherSchema = new mongoose.Schema({
  list: [
    {
      dt: {
        type: Date,
        // unique: true,
      },
      main: {
        temp: { type: Number },
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
    },
  ],

  city: {
    name: { type: String },
    country: { type: String },
  },
  dt_txt: { type: String },
});

// const weeklyWeatherSchema = new mongoose.Schema({
//   weekStartDate: { type: Date, required: true },
//   monday: dailyWeatherSchema,
//   tuesday: dailyWeatherSchema,
//   wednesday: dailyWeatherSchema,
//   thursday: dailyWeatherSchema,
//   friday: dailyWeatherSchema,
//   saturday: dailyWeatherSchema,
//   sunday: dailyWeatherSchema,
// });

// dailyWeatherSchema.pre('save', function (next) {
//   this.list.map(async function (item) {
//     // console.log(item.dt);
//     dynamicTime = item.dt;
//     const timestamp = dynamicTime * 1000; // Multiply by 1000 to convert from seconds to milliseconds
//     const date = new Date(timestamp);
//     const dateOnly = date;
//     // .toISOString()
//     // .split('T')[0];

//     // console.log(dateOnly, 'dddddddd');
//     return {
//       ...item,
//       dt: dateOnly,
//     };
//   });

//   next();
// });

const WeeklyWeather = mongoose.model(
  'Weekly Weather',
  dailyWeatherSchema
);

module.exports = WeeklyWeather;
// const dailyWeatherSchema = new mongoose.Schema({
//   dayOfWeek: { type: String, required: true },
//   temperature: { type: Number, required: true },
//   precipitation: { type: Number, required: true },
//   // Add other weather-related fields as needed
// });

// const WeeklyWeatherSchema = new mongoose.Schema({
//   weekStartDate: { type: Date, required: true },
//   sunday: dailyWeatherSchema,
//   monday: dailyWeatherSchema,
//   tuesday: dailyWeatherSchema,
//   wednesday: dailyWeatherSchema,
//   thursday: dailyWeatherSchema,
//   friday: dailyWeatherSchema,
//   saturday: dailyWeatherSchema,
// });

// const WeeklyWeather = mongoose.model(
//   'WeeklyWeather',
//   WeeklyWeatherSchema
// );

// module.exports = WeeklyWeather;
