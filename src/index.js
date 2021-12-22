const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const { mongoose } = require('./database')
const multer = require('./config/multer')
const cookieParser = require('cookie-parser')

//Settings
app.set('port', PORT)
app.set('view engine', 'ejs')

//Base Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())

//Base Routes
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/photos', multer.single('img'), require('./routes/fotografia.routes'))

app.listen(app.get('port'), ()=>{

    console.log('El servidor esta andando en el puerto: ' + PORT)

});