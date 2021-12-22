const render = {}
const photo = require('../models/fotografia')

render.login = (req, res)=>{
    res.render('login', {alert:false})
}

render.signup = (req, res)=>{
    res.render('signup', {alert:false})
}

render.createPhoto = (req, res)=>{
    res.render('createPhoto', {userId: req.params.userId})
}

render.editPhoto = async (req, res)=>{

    const photoFound = await photo.findById(req.params.id)
    res.render('editPhoto', {photoFound:photoFound, userId: req.params.userId})
}

render.browse = async (req, res)=>{

    try{

            const allPhotos = await photo.find()
            const photosLength = allPhotos.length
            const allPhotosShuffled = []
            const usedNumbers = []

        while(usedNumbers.length<photosLength){
            const randomNum = Math.floor(Math.random() * photosLength);

            if(!usedNumbers.includes(randomNum)){
                usedNumbers.push(randomNum)
            }
        }

        for(var i=0; i< usedNumbers.length; i++){

            const num = usedNumbers[i]
            allPhotosShuffled.push(allPhotos[num]);
            allPhotos.slice(usedNumbers[num], 1);

        }

        res.render('browse', {userId: req.params.userId ,allPhotosShuffled: allPhotosShuffled})

    }
    
    catch(err){
        console.log(err)
    }
    

}

module.exports = render