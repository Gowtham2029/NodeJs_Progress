const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        minLength:2,
        maxLength: 50
    },
    lastName: {
        type:String
    },
    emailId:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type:String,
        required:true,
        validate(value){
            if(validator.isStrongPassword(value)){
                throw new Error("Password is too weak");
            }
        }

    },
    age: {
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value)
        {

            if(!['male', 'female', 'other'].includes(value))
                {
                 
                  throw new Error("Invalid gender");
                }
        }
    },
    photoUrl:{
        type:String,
        default: "https://example.com/default-photo.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL");
            }
        }
    },

    about:{
        type:String,
        default:"This is bio of user"
    },

    skills:{
        type:[String],
    }
}, {timestamps:true});

module.exports = mongoose.model("User", userSchema);