const mongoose = require('mongoose');
require('dotenv').config({
  path: '../.env',
});

mongoose
  .connect(process.env.DATABASE_LOCAL) // , {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  //   useUnifiedTopology: true,
  // })
  .then(() => {
    console.log('DataBase in Connected 😎');
  });
