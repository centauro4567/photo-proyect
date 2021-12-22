const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({

    username: {type:String, require:true},
    password:{type:String, require:true}

});

userSchema.methods.encryptPass = async function(password, newUser, resolve){

    await bcryptjs.hash(password, 8, (err, hashedPassword)=>{
            
        newUser.password = hashedPassword
        resolve()
        
    })
}

module.exports = mongoose.model('user', userSchema);