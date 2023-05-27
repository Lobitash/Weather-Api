const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../users/userModel');
const correctPassword = require('../users/userModel');

const signToken = (id) => {
  return jwt.sign(
    { id }, //id = id above
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

//For everything that we need to wait to be find in database or to be compared with sth else we need to use await so that no possible err will happen in the future
exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  // We don't want to keep repeating this token part so we will just create a func for it

  const token = signToken(newUser._id);
  //   jwt.sign(
  //     { id: newUser._id },
  //     process.env.JWT_SECRET,
  //     { expiresIn: process.env.JWT_EXPIRES_IN }
  //   );
  //jwt document on Git (You can check for more information)
  res.status(201).json({
    status: 'successed',
    token,
    data: {
      user: newUser,
    },
  });
  console.log(newUser);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body; // Cuzthe names are the same
  //1) if email and pass exist
  if (!email || !password) {
    return next(
      res.send('Please provid Email and Password')
    );
  }
  //If we don't use return it will say cannot set headers after they are sent to the client

  //2. check if the user exists and pass in correct

  const user = await User.findOne({
    email,
  }).select('+password'); //email = email

  //belowe is the methode we just declared in the Model (Instance methode that is available in all the document)
  //    const correct = await user.correctPassword(
  //     password,
  //     user.password
  //   );
  //For above if user can't be found the nect line will never execute. so we will move the data so that we won't declare extra information

  if (
    !user ||
    !(await user.correctPassword(
      password,
      user.password
    ))
  ) {
    return next(
      res
        .status(401)
        .send('Incorrect Email Or password') //We do this so the attacker won't find out which data is not correct for security issues
    );
  }
  //it's telling us to go and select the data by email and add the password to the selected part
  //3. if eveything is ok, send token to client
  //console.log(user);

  const token = signToken(user._id);
  console.log(token);
  res.status(200).json({
    status: 'Ok',
    token,
  });
};

exports.protect = async (req, res, next) => {
  //1 - Get the token and see if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token =
      req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  if (!token) {
    return next(
      res.status(401).send({
        status: 'failed',
        message: "You're not logged in",
      })
    );
  }
  //2 - Validate the token

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  console.log(decoded);

  //3 - check if user still exists
  const freshUser = await User.findById(
    decoded.id
  );
  if (!freshUser) {
    console.log('Moving to the next MiddleWare');
    return next(
      res.status(401).send({
        status: 'failed',
        message:
          'The User for this token no longer exists',
      })
    );
  }
  //4 - check if user changed password after the JWT(token) was issued
  if (freshUser.passwordChangedAt(decoded.iat)) {
    console.log('password changed');
    return next(
      res.status(401).send({
        status: 'failed',
        message:
          'User Recently Changed his password',
      })
    );
  } //iat = issued at

  req.user = freshUser; // this for the next Part
  next(); //grant access to the protected Route
};

//ٌwe want to restrict some of our Routes :)

// this Below .. roles means that we're passing an parameter that is an array :)
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          message:
            "you don't have access to perform this act",
        })
      );
    }
    next();
  };
};
