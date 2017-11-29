const mongoose = require('mongoose');

// messages scheme
let messagesSchema = mongoose.Schema({
    from:{
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    
});

let message = module.exports = mongoose.model("Message", messagesSchema);