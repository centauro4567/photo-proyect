const env = require('../config/env')
const userCtrl = {};
const user = require('../models/user')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


userCtrl.signUp = async (req, res)=>{

    try{

        const reqUsername = req.body.username;

        if(reqUsername.trim() == '' || req.body.password.trim() == ''){
            res.render('signup', {alert: true, alertText: 'Invalid Username/Password'})
        }else{

            const foundUser = await user.findOne({username: reqUsername});
        
            if(!foundUser){
    
                const newUser = new user({
    
                    username: reqUsername,
                    
                });
    
                newUser.encryptPass(req.body.password, newUser, ()=>{
                    
                    newUser.save()
                    res.redirect('/api/users')
                
                })
    
            }else{
                rres.render('signup', {alert: true, alertText: 'User Already Exist'})
            }

        }
        
    }
    catch(err){
        console.log(err)

        res.status(500).send(err)
    }
        

};

userCtrl.signIn = async (req, res)=>{

    try{
        
        const reqUsername = req.body.username;
        
        const foundUser = await user.findOne({username: reqUsername});

        const secretKey = env.SECRET_KEY

        if(foundUser){
                
            const match = await bcryptjs.compare(req.body.password, foundUser.password)

            if(match){

                const token = jwt.sign(foundUser.username, secretKey)

                res.cookie('token', token, {httpOnly: true})
                res.redirect('/api/photos/dashboard/'+foundUser._id)

            }else{

                res.render('login',{alert:true, alertText:'Invalid Password'})
            }

        }else{

            res.render('login',{alert:true, alertText:'Invalid Username'})

        }

    }
    catch(err){
        console.log(err)

        res.status(500).json(err)
    }
    
    

}

userCtrl.signOut = async (req, res)=>{
    try {
        
        res.clearCookie('token')
        res.redirect('/api/users')

    } catch (err) {
        console.log(err)

        res.status(500).send(err)
    }
}


module.exports = userCtrl