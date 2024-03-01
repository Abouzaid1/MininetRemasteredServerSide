const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    position: {
        type: Object,
        default: { x: 100, y: 200 }
    },
    type:String,
    topoId: {
        type: String
    },
})

module.exports = mongoose.model('Device', deviceSchema);