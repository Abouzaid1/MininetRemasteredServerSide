const Device = require('../models/device.model');
const httpStatusText = require('../utils/httpStatusText');
const Topo = require('../models/topo.model');

const getAllDevice = async (req, res) => {
    const devices = await Device.find();
    res.json(devices);
}
const addDevice = async (req, res) => {
    const newDevice = new Device(req.body);
    await newDevice.save();
    console.log('====================================');
    console.log(newDevice);
    console.log('====================================');
    const topo = await Topo.findById(req.body.topoId);
    if (newDevice.type == "pc") {
        topo.pcs.push(newDevice._id);
        console.log(newDevice.type);
    }
    else if (newDevice.type == "sw") {
        console.log(newDevice.type);
        topo.sws.push(newDevice._id);
    }
    else if (newDevice.type == "ro") {
        console.log(newDevice.type);
        topo.routers.push(newDevice._id);
    }
    else if (newDevice.type == "co") {
        console.log(newDevice.type);
        topo.controllers.push(newDevice._id);
    }
    else if (newDevice.type == "la") {
        console.log(newDevice.type);
        topo.laptops.push(newDevice._id);
    }
    await topo.save();
    console.log(newDevice);
}


module.exports = {
    getAllDevice,
    addDevice
}