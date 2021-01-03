const mongoose = require('mongoose');

const CarProfileSchema = mongoose.Schema({
    patent: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    developer: {
        type: String,
        required: true,
        trim: true
    },
    initKMS: {
        type: String,
        trim: true
    },
    actualKMS: {
        type: String,
        trim: true
    },
    primary: {
        type: Boolean,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    nickName: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('CarProfile', CarProfileSchema);
