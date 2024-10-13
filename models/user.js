const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "_id": ObjectId,
    "username": String,
    "email": String,
    "password": String,
    "created_at": Date,
    "updated_at": Date
});

module.exports = mongoose.mode('User', userSchema);