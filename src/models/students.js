const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: [30, "maximum 30 letters"],
    },
    email:{
        type: String,
        required: true,
        unique: [true, "this Email is already exists"],
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
})
// create model
const Student = new mongoose.model('Student', studentSchema);

// create user define module to use on other page
module.exports = Student;
