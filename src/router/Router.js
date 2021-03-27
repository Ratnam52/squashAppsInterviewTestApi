const express = require('express')
const router = new express.Router()

const PersonalDetailsModel = require('../model/personalDetailsModel')
const CompanyDetailsModel = require('../model/companyDetailsModel')
const emailSend = require('../common/otpFunctions')
const config = require('../common/config')


// PersonalDetails add
router.post('/personalDetails/add', async (req, res) => {
    const personalDetails = await new PersonalDetailsModel(req.body)

    personalDetails.save().then((data) => {
        res.status(200).send({
            data: data,
            message: config.saveMessage
        })
    }).catch((error) => {
        res.status(400).send({
            data: error,
            message: config.errorMessage
        })
    })
})

// PersonalDetails update
router.put('/personalDetails/update', async (req, res) => {
    const updates = Object.keys(req.body)
    const personalDetails = await PersonalDetailsModel.findById(req.body['_id'])

    try {
        if (!personalDetails) {
            return res.status(200).send({
                data: '',
                message: config.errorMessage
            })
        }

        updates.forEach((value) => personalDetails[value] = req.body[value])

        personalDetails.save().then((data) => {
            res.status(200).send({
                data: data,
                message: config.saveMessage
            })
        }).catch((error) => {
            res.status(400).send({
                data: error,
                message: config.errorMessage
            })
        })
    } catch (error) {
        res.status(500).send({
            data: error,
            message: config.errorMessage
        })
    }
})

// PersonalDetails get by id
router.get('/personalDetails/getById/:id', async (req, res) => {
    try {
        const personalDetails = await PersonalDetailsModel.findById(req.params.id)

        res.status(200).send({
            data: personalDetails,
            message: config.fetchMessage
        })
    } catch (error) {
        res.status(500).send({
            data: error,
            message: config.errorMessage
        })
    }
})

// CompanyDetails add
router.post('/companyDetails/add', async (req, res) => {
    const companyDetails = await new CompanyDetailsModel(req.body)

    companyDetails.save().then((data) => {
        res.status(200).send({
            data: data,
            message: config.saveMessage
        })
    }).catch((error) => {
        res.status(400).send({
            data: error,
            message: config.errorMessage
        })
    })
})

// CompanyDetails update
router.put('/companyDetails/update', async (req, res) => {
    const updates = Object.keys(req.body)
    const companyDetails = await CompanyDetailsModel.findById(req.body['_id'])

    try {
        if (!companyDetails) {
            return res.status(200).send({
                data: '',
                message: config.errorMessage
            })
        }

        updates.forEach((value) => companyDetails[value] = req.body[value])

        companyDetails.save().then((data) => {
            res.status(200).send({
                data: data,
                message: config.saveMessage
            })
        }).catch((error) => {
            res.status(400).send({
                data: error,
                message: config.errorMessage
            })
        })
    } catch (error) {
        res.status(500).send({
            data: error,
            message: config.errorMessage
        })
    }
})

// CompanyDetails get by id
router.get('/companyDetails/getById/:id', async (req, res) => {
    try {
        const companyDetails = await CompanyDetailsModel.findById(req.params.id)

        res.status(200).send({
            data: companyDetails,
            message: config.fetchMessage
        })
    } catch (error) {
        res.status(500).send({
            data: error,
            message: config.errorMessage
        })
    }
})

// Email OTP
router.get('/email/otp/:personalDetailsId/:companyDetailsId', async (req, res) => {
    try {
        const personalDetails = await PersonalDetailsModel.findById(req.params.personalDetailsId)
        const companyDetails = await CompanyDetailsModel.findById(req.params.companyDetailsId)

        let otpData = await emailSend(personalDetails.full_name, companyDetails.email_id)

        res.status(200).send({
            data: otpData,
            message: config.otpMessage
        })
    } catch (error) {
        res.status(500).send({
            data: error,
            message: config.errorMessage
        })
    }
})

module.exports = router