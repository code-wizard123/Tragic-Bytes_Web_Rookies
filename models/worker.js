const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const workerSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true,
    required : true,
    minlength : [4, 'Minimum username length is 4']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});

module.exports = mongoose.model('Worker', workerSchema);

