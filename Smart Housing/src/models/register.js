const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Username : {
        type: String,
        required:true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Confirmpassword: {
        type: String,
        required: true
    },
    Comments: {
        type: String,
    }

})

const Register = new mongoose.model("register", userSchema);

module.exports = Register;