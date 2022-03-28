const mongoose = require('mongoose');

const LedShema = new mongoose.Schema({
    statu: {
        type: String
    },
});

module.exports = mongoose.model('Led', LedShema);