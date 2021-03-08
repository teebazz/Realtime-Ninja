const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
 "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  }

*/

//create geo location schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default:"Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

//create ninja schema and model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is Required']
    },
    rank: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema

    //add in geo Location
})

const Ninja = mongoose.model('ninja', NinjaSchema)

module.exports = Ninja;