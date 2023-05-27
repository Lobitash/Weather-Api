const express = require('express');
const router = express.Router();
const weather = require('./currentweatherController');
const userAuth = require('../../auths/userAuthentication');
router.route('/').get(weather.getAllWeathers);

router
  .route('/:city')
  .get(
    userAuth.protect,
    weather.getCurrentWeather
  )
  .delete(
    userAuth.protect,
    userAuth.restrictTo('admin', 'mahsa'),
    weather.deleteCurrentWeather
  );

module.exports = router;
