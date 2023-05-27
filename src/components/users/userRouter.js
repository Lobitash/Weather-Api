const express = require('express');
const router = express.Router();
const userController = require('./currentweatherController');
const userAuth = require('../../auths/userAuthentication');

// router.route('/').get(userController.);

router
  .route('/login')
  .get(
    userAuth.protect,
    weather.getCurrentWeather
  )
  .post()
  .delete(
    userAuth.protect,

    weather.deleteCurrentWeather
  );

module.exports = router;
