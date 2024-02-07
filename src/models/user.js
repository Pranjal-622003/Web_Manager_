import mongoose, { Schema } from "mongoose";
const userSchema=new Schema({
    name:{ type: String },
    email:{
        type:String,
        required:[true,"Email required"],     
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password required"],
    },
    about:{ type: String },
    profileURL:{ type: String },

})

export const User= mongoose.models.users||mongoose.model("users",userSchema)