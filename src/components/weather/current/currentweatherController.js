require('express');
// require('dotenv').config({
//   path: '../../../.env',
// });

const Weather = require('./currentWeatherModel');
const CityName = require('../../city/currentCityNameModel');
const axios = require('axios');
const apiKey = `${process.env.API_KEY}`;

exports.getAllWeathers = async (req, res) => {
  const temps = await Weather.find({});

  if (temps) {
    res.status(200).json({
      status: 'Succeceed',
      data: {
        temps,
      },
    });
  }
};

exports.getCurrentWeather = async (req, res) => {
  let city = req.params.city;
  console.log(city);
  let temps = await Weather.findOne({
    name: city,
  });

  if (temps) {
    res.status(200).json({
      status: 'Succeceed',
      data: {
        temps,
      },
    });
  } else {
    console.log('city : ', city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const newData = response.data;
      res.status(200).json(newData);
      await new Weather(newData).save();
      await new CityName(newData).save();
    } catch (err) {
      res
        .status(404)
        .send('Something Went Wrong!! 💥💥');
      console.log(err);
    }
  }
};

exports.deleteCurrentWeather = async (
  req,
  res
) => {
  let city = req.params.city;

  const deleteData =
    await Weather.findOneAndDelete({
      name: city,
    });

  const deleteCityName =
    await CityName.findOneAndDelete({
      name: city,
    });

  if (!deleteCityName || !deleteData) {
    res.send(
      'City Name Does Not Exist In DataBase'
    );
  } else {
    res.send('Data Has benn Deleted ');
  }

  // let city = req.params.city;
  // console.log(city);
  // let temps = await Weather.deleteOne({
  //   name: city,
  // }).delete((res, err) => {
  //   if (temps) {
  //     res.status(200).json({
  //       status: 'Succed',
  //       data: {
  //         temps,
  //       },
  //     });
  //   } else {
  //     res.status(404).json({
  //       status: 'City Does Not Exist in DataBase',
  //       data: null,
  //     });
  //   }
  // });
};
