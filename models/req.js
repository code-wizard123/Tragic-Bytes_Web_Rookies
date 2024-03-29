const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Client = require('./client')
const Worker = require('./worker')

const reqSchema = new Schema({

    category: {
        type: String,
        enum: ['Painting', 'Mason', 'Plumbing', 'Carpentary', 'Electrician', 'Labour Services', 'Housekeeping','Pest Control']
    },
    deatil: String,
    client: {type: Schema.Types.ObjectId, ref:'Client'},
    worker: {type: Schema.Types.ObjectId, ref:'Worker'},
    intrestedworker : [{type: Schema.Types.ObjectId, ref:'Worker'}],
    isMatched: Boolean,
    pincode: {
        type: Number,
        min: [100000, 'Please enter a valid  pincode'],
        max: [999999, 'Please enter a valid pincode']
    },
    price : Number
})

module.exports = mongoose.model('Req', reqSchema)