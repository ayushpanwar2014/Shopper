const mongoose = require('mongoose');

//Schema for User

const UserSchema = mongoose.model('User', {
    
    username: {
        type: String,
        require:true
    },

    email: {
        type: String,
        unique: true,
        require:true
    },

    password: {
        type: String,
        require:true
    },
    
    cartData: {
        type: Object
    },

    date: {
        type: Date,
        default: Date.now,
    }

});

module.exports = UserSchema;