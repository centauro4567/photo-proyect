const env = require('./config/env')
const mongoose = require('mongoose')

const URI = env.MONGO_URI


mongoose.connect(URI)
        .then(db => console.log('la base de datos funciona'))
        .catch(err => console.log(err));

module.exports = mongoose