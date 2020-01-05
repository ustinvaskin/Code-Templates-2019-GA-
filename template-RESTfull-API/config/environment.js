const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/legends'
const port = process.env.PORT || 4000 
const secret = process.env.SECRET || 'big secret'

module.exports = { dbURI, port, secret }