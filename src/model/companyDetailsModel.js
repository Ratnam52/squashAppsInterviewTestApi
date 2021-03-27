const mongoose = require('mongoose')
const validator = require('validator')

// Create schema
const companyDetailsSchema = new mongoose.Schema({
    company_logo: {
        type: String
    },
    personal_details_id: {
        required: true,
        trim: true,
        type: String
    },
    company_name: {
        required: true,
        trim: true,
        type: String
    },
    email_id: {
        lowercase: true,
        required: true,
        trim: true,
        type: String,
        // unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    job_title: {
        required: true,
        trim: true,
        type: String
    },
    year_of_experiance: {
        required: true,
        trim: true,
        type: Number
    }
})

// Create model
const CompanyDetailsModel = mongoose.model('companyDetails', companyDetailsSchema)

module.exports = CompanyDetailsModel