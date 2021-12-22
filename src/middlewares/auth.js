require('dotenv').config();

const { json } = require('express/lib/response');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    const token = req.cookies.token

    if(!token){
        res.status(500).send('No Token Found')
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY)

    if(!verified){
        res.status(500).send('Invalid User/Token')
    }

    next()

};