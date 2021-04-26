require('dotenv').config()
const fs = require("fs")
const path = require("path")
const Models = require('./models')
const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true})

/**
 * Include all schemas in path /schemas
 */
const registerSchemas = () =>
{
    const schemas = fs.readdirSync(path.join(__dirname, "schemas"))

    schemas.map(schema => {
        const schemaName = schema.split(".js")[0]
        Models[schemaName] = require(`./schemas/${schema}`)
    })
}

module.exports = registerSchemas()
