const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    message: String,
    name: String,
    phoneNumber: Number,
    date: {
        type: Date,         
        default: Date.now   
    },
    time: String
});

const Project = mongoose.model("project", userSchema);

module.exports = Project;
