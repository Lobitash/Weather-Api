require('dotenv').config({
  path: '../.env',
});
const app = require('./app');

// const mongoose = require('mongoose');
// require('dotenv').config({
//   path: './config.env',
// });

// mongoose
//   .connect(process.env.DATABASE_LOCAL) // , {
//   //   useNewUrlParser: true,
//   //   useCreateIndex: true,
//   //   useFindAndModify: false,
//   //   useUnifiedTopology: true,
//   // })
//   .then(() => {
//     console.log('DataBase in Connected 😎');
//   });
const port = 3004 || process.env.PORT;
app.listen(port, () => {
  console.log(
    `Server is Running on port ${port}`
  );
});
