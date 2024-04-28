import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter a username"],
        unique: true
    },
    email:{
        type:String,
        required:[true,"Please enter a email"],
        unique: true
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken : {type: String},
    forgotPasswordTokenExpiry : {type:Date},
    verifyToken : {type:String},
    verifyTokenExpiry : {type:Date}
})

const User = mongoose.models.users || mongoose.model("users",UserSchema)

export default User;