const express = require('express');
const db = require('../connection/database');
require('mongoose');
const app = express();
const currentWeather = require('./components/weather/current/currentweatherController');
const currentWeatherRouter = require('./components/weather/current//currentWeatherRouter');
const forcastWeather = require('./components/weather/forcastWeekly/forcastWeeklyRouter');
const Forcast = require('./components/weather/forcastWeekly/forcastWeeklyModel');
const cron = require('node-cron');
app.use(express.json());
const currentWeatherUpdate = require('./components/weather/current/currentWeatherJob');
const forcastWeatherUpdate = require('./components/weather/forcastWeekly/forcastWeeklyJob');
const userAuthentication = require('./components/auths/userAuthentication');
const userController = require('./components/users/userController');
//____________________________________________________________Route ____USER

// app.use('/api/v1/user', userController);

app.post('/signup', userAuthentication.signup);
app.post('/login', userAuthentication.login);

//____________________________________________________________Route ____WEATHER
app.use('/api/v1/weather', currentWeatherRouter);
app.use('/api/v1/forcast', forcastWeather);
//app.use('/api/v1/weather', currentWeatherRouter);

// app.use();
// app.use();

// app
//   .route('/weather/:city')
//   .get(currentWeather.getCurrentWeather)
//   .delete(currentWeather.deleteCurrentWeather)
//   .put();

// app.get(
//   '/weather',
//   currentWeather.getAllWeathers
// );

//Every Monday at 9 am ('0 9 * * 1')

//Every 5 Hours */ => Every
//Delete * => at the special Time

//____________________________________________________________CRON_JOBS
cron.schedule('*/5 * * * *', () => {
  currentWeatherUpdate();
});

cron.schedule('*/60 * * * * ', () => {
  forcastWeatherUpdate();
});

module.exports = app;

// * * * * * *  Must Be six
