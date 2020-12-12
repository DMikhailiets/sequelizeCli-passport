const express = require('express')
const Sequelize = require('sequelize')
const dotenv = require('dotenv')
const router = require('./app/router')
const bodyParser = require('body-parser')

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(bodyParser.json())
app.use(router)

app.listen(PORT,() => {
    console.log(`Listening on ${PORT}`)
})