const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    mentors: {
        type: [{type: mongoose.Types.ObjectId, ref: 'Mentors'}],
        required: false,
    }
})

// create a model with the given schema and export it
module.exports = mongoose.model("Students", studentSchema)