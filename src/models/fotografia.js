const mongoose = require('mongoose');
const schema = mongoose.Schema;

const photoSchema = new schema ({

    name: {type:String},
    description: {type:String},
    imgPath: {type:String},
    imgId: {type:String},
    user: {
        
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: true

    }

})

photoSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('photo', photoSchema);