const photoCtrl = {};
const photo = require('../models/fotografia');
const user = require('../models/user')
const cloudinary = require('../config/cloudinary');



photoCtrl.getPhotos = async(req, res)=>{

    try {

        const { userId } = req.params

    const photos = await photo.find({user: userId})
    if(!photos){
        res.status(404).send('No images founded')
    }else{

        const userFound = await user.findById(userId)
        
    res.render('dashboard',{photos:photos, username: userFound.username, userId: userFound._id})
}
        
    } catch (error) {
        console.log(error)
    }
    

}

photoCtrl.getOnePhoto = async(req, res)=>{

    try {
        
        const { userId, id } = req.params

        const photoFound = await photo.findOne({user: userId, _id: id})
    
        if(!photoFound){

            const photoNoUser = await photo.findOne({_id: id})

            if(!photoNoUser){

                res.status(404).send('No Image Found')

            }else{
                res.render('photoNoUser', {photoNoUser: photoNoUser, userId: userId})
            }
            
        }else{
    
            res.render('photo', {photoFound: photoFound, userId:userId})
        }


    } catch (error) {
        console.log(error)
    }

   

}

photoCtrl.uploadPhoto = async (req, res)=>{

    try {

        const{name, description} = req.body

        if(name.trim()=='' || description.trim()=='' || req.file == null){
            res.render('createPhoto', {alert: true, alertText: 'Fill all fields', userId: req.params.userId})
        }else{

        const uploadedPhoto = await cloudinary.uploader.upload(req.file.path, {folder: 'proyecto de fotografias'})

        const newPhoto = new photo({

        name: name,
        description: description,
        imgPath: uploadedPhoto.secure_url,
        imgId: uploadedPhoto.public_id,
        user: req.params.userId

        })

        await newPhoto.save();

        res.redirect('/api/photos/dashboard/'+req.params.userId)

        }
    } catch (error) {
        console.log(error)
    }

    

}

photoCtrl.updatePhoto = async (req, res)=>{

    try {

        const {name, description} = req.body

        const photoFound = await photo.findById(req.params.id)

        if(name.trim()=='' || description.trim()==''){

            res.render('editPhoto', {alert:true, alertText:'Fill all Fields', photoFound:photoFound, userId: req.params.userId})
        }else{

        const name = req.body.name
        const description = req.body.description

        photoFound.name = name;
        photoFound.description = description

        const finishPhoto = await photo.findByIdAndUpdate(req.params.id, photoFound, {new:true})

        res.redirect('/api/photos/dashboard/'+req.params.userId)

        }

    } catch (error) {
        console.log(error)
    }

    

}

photoCtrl.deletePhoto = async (req, res)=>{

    try {
        
        const userIdFound = req.params.userId

        const deletedPhoto = await photo.findByIdAndDelete(req.params.id)
        await cloudinary.uploader.destroy(deletedPhoto.imgId)

        res.redirect('/api/photos/dashboard/'+userIdFound)

    } catch (error) {
        console.log(error)
    }
    

}

module.exports = photoCtrl