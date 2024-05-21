const mongoose = require('mongoose');
const Device = require('./device.model');
const topoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pcs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }],
    text: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Text'
    }],
    routers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }],
    sws: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }],
    controllers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }],
    laptops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }],
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
})
module.exports = mongoose.model('Topo', topoSchema);