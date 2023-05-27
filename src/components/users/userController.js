const User = require('./userModel');

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'succeed',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = async (req, res) => {
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
