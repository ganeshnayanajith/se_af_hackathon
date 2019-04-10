const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    start_date: {
        type: String
    },
    end_date: {
        type: String
    },
    pax: {
        type: String
    },

});

module.exports = mongoose.model('Cost', Cost);