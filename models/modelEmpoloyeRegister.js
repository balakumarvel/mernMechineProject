const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name:String,
    email: String,
    phone : Number,
    designation: String,
    gender: String,
    image: String,
    course : {
        type : Array,
        default : []}
})
const modelEmpoloyeeRegister = mongoose.model('modelRegister1',registerSchema)
module.exports=modelEmpoloyeeRegister