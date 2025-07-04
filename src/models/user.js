const mongoose = require('mongoose');

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
    },
    password: {
        type:String,
        required:true,

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
        default: "https://example.com/default-photo.jpg"
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