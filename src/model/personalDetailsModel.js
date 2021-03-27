const mongoose = require('mongoose')

// Create schema
const personalDetailsSchema = new mongoose.Schema({
    full_name: {
        required: true,
        trim: true,
        type: String
    },
    gender: {
        required: true,
        trim: true,
        type: String
    },
    country: {
        required: true,
        trim: true,
        type: String
    },
    state: {
        required: true,
        trim: true,
        type: String
    },
    phone_number: {
        required: true,
        trim: true,
        type: Number
    }
})

// Create model
const PersonalDetailsModel = mongoose.model('personalDetails', personalDetailsSchema)

module.exports = PersonalDetailsModel