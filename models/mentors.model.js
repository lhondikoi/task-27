const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    students: {
        type: [{type: mongoose.Types.ObjectId, ref: 'Students'}],
        required: false
    }
})

// create a model with the given schema and export it
module.exports = mongoose.model('Mentors', mentorSchema)