const { MongoClient } = require('mongodb')

const mongoUri = 'mongodb+srv://qax:xperience@mark85.c3lv0u5.mongodb.net/markdb?retryWrites=true&w=majority&appName=Mark85'

const client = new MongoClient(mongoUri)

async function connect() {
    await client.connect()
    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }