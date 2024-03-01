const mongoose = require('mongoose');

const topoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pcs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
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
        ref: 'Links'
    }],
    creator: {
        type: String,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
})

module.exports = mongoose.model('Topo', topoSchema);