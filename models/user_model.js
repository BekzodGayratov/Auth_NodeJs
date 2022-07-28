const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NEW USER SCHEMA
const UserSchema = new Schema({
    display_name: {
        type: String,
        default: null,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
        default: null,
        unique: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    details: {
        phone: { type: String, required: true, },
        ip: { type: String, required: true },
        imei: { type: String, required: true }
    },
    access_token: { type: String },
});

module.exports = mongoose.model('user', UserSchema);