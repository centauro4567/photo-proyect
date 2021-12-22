const express = require('express');
const photoCtrl = require('../controllers/photoCtrl');
const auth = require('../middlewares/auth');
const router = express.Router();
const render = require('../controllers/render')

//Dashboard
router.get('/dashboard/:userId', photoCtrl.getPhotos)

router.get('/dashboard/:userId/:id', auth,  photoCtrl.getOnePhoto)



//Create
router.get('/create/:userId', render.createPhoto)

router.post('/create/:userId', auth,  photoCtrl.uploadPhoto);


//Edit & Delete
router.get('/edit/:userId/:id', auth, render.editPhoto)

router.post('/edit/:userId/:id', auth, photoCtrl.updatePhoto)

router.get('/delete/:userId/:id', auth, photoCtrl.deletePhoto)

//Browser
router.get('/browser/:userId', auth, render.browse)

module.exports = router