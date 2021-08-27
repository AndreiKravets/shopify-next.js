const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
    user: {type:Schema.Types.ObjectID, ref:'User'},
    refreshToken: {type:String, required: true}
})

module.exports = model('Token', TokenSchema)