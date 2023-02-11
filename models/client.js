const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema

const Req = require('./req') 

const clientSchema = new Schema({
  cusername:{
    type: String,
    unique: true,
    required : true,
    minlength : [4, 'Minimum username length is 4']
  },
  cemail: {
    type: String,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email']
  },
  cpassword: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  caddress:{
    type: String,
    minlength:[10, 'Please add more details'],
  },
  cpincode : {
    type:Number,
    min:[100000, 'Please enter a valid  pincode'],
    max:[999999, 'Please enter a valid pincode']
  },
  cnumber : {
    type:Number,
    min :[1000000000, 'Please enter a valid phone number'],
    max:[9999999999, 'Please enter a valid phone number']
  },
  creq : [{type: Schema.Types.ObjectId, ref:'Req'}]
});

module.exports = mongoose.model('Client', clientSchema);