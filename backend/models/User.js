const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    age:{
        type:Number,
        min:[18,"User must be at least 18 years odl"],
        max:[70,"Age Must be Less than 70"]
        
    },
    isActive:{
        type:Boolean,
        default:true,
    }

},
{
    timestamps:true,

}
);

const User = mongoose.model("User",UserSchema);

module.exports = User;

