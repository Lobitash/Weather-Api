const express = require('express');
const router = express.Router();
const forcast = require('./forcastWeeklyController');
const authController = require('../../auths/userAuthentication');

//router.route('/').get();

router
  .route('/:city')
  .get(forcast.getForcastWeather)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'mahsa'),
    forcast.deleteForcastWeather
  );
//.delete(weather.deleteCurren tWeather);

module.exports = router;
