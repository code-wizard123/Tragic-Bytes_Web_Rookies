const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema

const workerSchema = new Schema({
  name:{
    type:String,
    minlength:[6, 'Please enter a bigger name']
  },
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
  },
  photoid : {
    type : String,
    required : [true, 'Please upload a photo']
  },
  number : {
    type : Number,
    min :[1000000000, 'Please enter a valid phone number'],
    max:[9999999999, 'Please enter a valid phone number']
  },
  workcount : Number,
  workexp : {
    type : [String],
    enum : ['Painting', 'Mason', 'Plumbing', 'Carpentary', 'Electrician', 'Labour Services', 'Housekeeping' , 'Pest Control']
  }
});

module.exports = mongoose.model('Worker', workerSchema);

