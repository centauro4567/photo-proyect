const express = require('express');
const userCtrl = require('../controllers/userCtrl')
const router = express.Router();
const render = require('../controllers/render')

//Login
router.get('/', render.login);

router.post('/signin', userCtrl.signIn);

//SignUp
router.get('/signup', render.signup);

router.post('/signup', userCtrl.signUp);

//LogOut
router.get('/signout', userCtrl.signOut);

module.exports = router