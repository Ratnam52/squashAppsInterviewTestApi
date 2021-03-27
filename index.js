require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./src/db/mongoose')
const router = require('./src/router/Router')

//port setting
const port = process.env.PORT

// Default settings
const app = express()
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.json())
app.use(cors())

//Set header types
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    next()
})

//Router
app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/api', router)

//Page not found api
app.use((req, res, next) => {
    const error = new Error('404, Page not found!')
    error.status = 404
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => { console.log(`server is running on ${port}`) })
