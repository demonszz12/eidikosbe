const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username:{type:String, requires:true},
    email:{type:String,requires:true},
    password:{type:String, requires:true},
    category:{type:String, requires:true}
})
const UserModel = mongoose.model("user",userSchema)
module.exports = {UserModel}