const CurrentWeather = require('./currentWeatherModel');
const CityName = require('../../city/currentCityNameModel');
require('express');
const apiKey = `${process.env.API_KEY}`;

const axios = require('axios');

function currentWeatherUpdate() {
  CityName.find({}, { _id: 0, name: 1 }).then(
    (data) => {
      const cityNames = data.map(
        (data) => data.name
      );
      console.log(cityNames);
      cityNames.forEach((cityname) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`
          )
          .then((response) => {
            const weatherData = response.data;
            CurrentWeather.updateMany(
              weatherData
            );

            console.log(
              'City Weathers have been Updated just now'
            );
          })
          .catch((error) => {
            console.log('Error:');
          });
      });
    }
  );
}

module.exports = currentWeatherUpdate;
