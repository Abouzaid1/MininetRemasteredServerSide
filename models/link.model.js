const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    link:{
        type:Object
    },
    topoId: {
        type: String
    },
})

module.exports = mongoose.model('Link', linkSchema);