const mongoose = require('mongoose');
const validator = require('validator');

// install Validator Globally
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requires: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your Email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      'Please entera valid Email',
    ],
  },

  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'guest', 'mahsa'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please Enter a pasword'],
    minlength: 8,
    select: false, //it won't be shown in the ourPut
  },
  passwordConfirm: {
    type: String,
    required: [
      true,
      'Please confirm your password',
    ],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
    message: 'passwords are not the same ',
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(
    this.password,
    12
  );

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword =
  async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(
      candidatePassword,
      userPassword
    );
  };

userSchema.methods.changedPasswordAfter =
  function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );

      //We changed millisecond to second and we say in 10
      console.log(
        this.passwordChangedAt,
        JWTTimestamp
      );
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  };

const User = mongoose.model('Users', userSchema);
module.exports = User;
