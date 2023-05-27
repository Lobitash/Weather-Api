const ForcastModel = require('./forcastWeeklyModel');
const CityName = require('../../city/forcastCityNameModel');

require('express');
const apiKey = `${process.env.API_KEY}`;

const axios = require('axios');

function forcastWeatherUpdate() {
  CityName.find(
    {},
    { _id: 0, 'city.name': 1 }
  ).then((data) => {
    const cityNames = data.map(
      (data) => data.city.name
    );
    console.log(cityNames);
    cityNames.forEach((cityname) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&&appid=7f097ec114a52df31f107264b990caf5`
        )
        .then((response) => {
          const weatherData = response.data;
          ForcastModel.updateMany(weatherData);

          console.log(
            'City weekly Forecast data has been Updated just now'
          );
        })
        .catch((error) => {
          console.log('Error:');
        });
    });
  });
}

module.exports = forcastWeatherUpdate;
