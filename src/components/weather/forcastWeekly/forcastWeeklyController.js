const axios = require('axios');
const express = require('express');
const forcastModel = require('./forcastWeeklyModel');
const apiKey = `${process.env.apiKey}`;
const CityName = require('../../city/forcastCityNameModel');
const { Types } = require('mongoose');

exports.getForcastWeather = async (req, res) => {
  let city = req.params.city;
  console.log(city);
  let temps = await forcastModel.findOne({
    'city.name': city,
  });

  if (temps) {
    res.status(200).json({
      status: 'Succeceed',
      data: {
        temps,
      },
    });
  } else {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&&appid=7f097ec114a52df31f107264b990caf5`
      )
      .then(async (response) => {
        const newForcastData =
          await response.data;
        res.status(200).json(newForcastData);

        const dateMap = [];
        for (
          let index = 0;
          index < newForcastData.list.length;
          index += 8
        ) {
          console.log(index);
          const element =
            newForcastData.list[index];
          dynamicTime = element.dt;
          const timestamp = dynamicTime * 1000; // Multiply by 1000 to convert from seconds to milliseconds
          const date = new Date(timestamp);
          const dateOnly = date;
          // .toISOString();
          // .split('T')[0];

          console.log(dateOnly, 'Controlllller');
          dateMap.push({
            ...element,
            dt: dateOnly,
          });
        }

        // const dateMap = newForcastData.list.map(
        //   function (item) {
        //     console.log(item.dt);
        //     dynamicTime = item.dt;
        //     const timestamp = dynamicTime * 1000; // Multiply by 1000 to convert from seconds to milliseconds
        //     const date = new Date(timestamp);
        //     const dateOnly = date;
        //     // .toISOString();
        //     // .split('T')[0];

        //     console.log(
        //       dateOnly,
        //       'Controlllller'
        //     );
        //     return {
        //       ...item,
        //       dt: dateOnly,
        //     };
        //   }
        // );
        console.log(newForcastData.list);
        newForcastData.list = dateMap;

        await new forcastModel(
          newForcastData
          // dateMap
        ).save();

        await new CityName(newForcastData).save();
      });
  }
};

exports.deleteForcastWeather = async (
  req,
  res
) => {
  let city = req.params.city;
  const deleteData =
    await forcastModel.findOneAndDelete({
      'city.name': city,
    });

  const deleteCityName =
    await CityName.findOneAndDelete({
      'city.name': city,
    });

  if (!deleteCityName || !deleteData) {
    res.send(
      'City Name Does Not Exist In DataBase'
    );
  } else {
    res.send('Data Has benn Deleted ');
  }
};
//   await axios
//     .get(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${city}&&appid=7f097ec114a52df31f107264b990caf5`
//     )
//     .then(async (response) => {
//       const newForcastData = await response.data;
//       res.status(200).json(newForcastData);

//       await new forcastModel(
//         newForcastData
//       ).save();

//   console.log(newForcastData.list[0].dt);

//   //   console.log(newForcastData);

//   for (
//     i = 0;
//     i < newForcastData.list.length;
//     i++
//   ) {
//     const dynamicTime =
//       newForcastData.list[i].dt;

//     const timestamp = dynamicTime * 1000; // Multiply by 1000 to convert from seconds to milliseconds
//     const date = new Date(timestamp);
//     const dateOnly = date
//       .toISOString()
//       .split('T')[0];
//     newForcastData.list[i].dt = dateOnly;

//     console.log(dateOnly);

//   await new forcastModel(
//     newForcastData
//   ).save();
//   }

// const Y =res
//   .send('200')
//   .json(newForcastData);
// console.log(
//,
//   Y
// );
// const t = res.status(200).json({
//   message: 'message',
//   data: { data: newForcastData },
// });
// console.log(response.body);
// const newForcastData = await response.data;
// const t = res.status(200).json({
//   message: 'message',
//   data: { data: newForcastData },
// });
// console.log(res.body);

// // const weeklyForcast = await axios(
// // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&&appid=7f097ec114a52df31f107264b990caf5`
// // );
// // const response = await weeklyForcast.json(res);
// for (let i = 0; i < response.length; i++) {
//   new Forcast(response).save();
// }

// // console.log(url);
// try {

// const response = await axios.get(url);
// const newForcastData = await response.data;
// res.status(200).json(newForcastData);
//   await new Forcast(newForcastData).save();
// } catch (err) {
//   res
//     .status(404)
//     .send('Something Went Wrong!! 💥💥');
//   console.log(err);
// }

// __________________________________________________COMMENT____SECTION________________________________________________________________________________________

//This part Gives me The index 0 date as i Want :

// await axios
//   .get(
//     `https://api.openweathermap.org/data/2.5/forecast?q=${city}&&appid=7f097ec114a52df31f107264b990caf5`
//   )
//   .then(async (response) => {
//     const newForcastData = await response.data;
//     res.status(200).json(newForcastData);
//     const dynamicTime = newForcastData.list[0].dt;

//     const timestamp = dynamicTime * 1000; // Multiply by 1000 to convert from seconds to milliseconds
//     const date = new Date(timestamp);
//     const dateOnly = date
//       .toISOString()
//       .split('T')[0];
//     newForcastData.list[0].dt = dateOnly;

//     console.log(dateOnly);
//     await new forcastModel(newForcastData).save();
//   });

//__________________________________________________
