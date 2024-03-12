const Device = require('../models/device.model');
const httpStatusText = require('../utils/httpStatusText');
const Topo = require('../models/topo.model');

const getAllDevice = async (req, res) => {
    const devices = await Device.find();
    res.json(devices);
}
const addDevice = async (req, res) => {
    if (!req.body.name){
        res.json("The device should has a host name")
    }else{

        const newDevice = new Device(req.body);
        await newDevice.save();
    
        const topo = await Topo.findById(req.body.topoId);
        if (newDevice.type == "pc") {
            topo.pcs.push(newDevice._id);
        }
        else if (newDevice.type == "sw") {
            topo.sws.push(newDevice._id);
        }
        else if (newDevice.type == "ro") {
            topo.routers.push(newDevice._id);
        }
        else if (newDevice.type == "co") {
            topo.controllers.push(newDevice._id);
        }
        else if (newDevice.type == "la") {
            topo.laptops.push(newDevice._id);
        }
        await topo.save();
    }
}
const removeDevice = async (req,res) => {
    const deviceId = req.params.id
    console.log(deviceId);
    const device = await Device.findById(deviceId);
    const type = device.type
    await Device.deleteOne({_id: deviceId})
    await Topo.deleteOne({_id: deviceId})
}

module.exports = {
    getAllDevice,
    addDevice,
    removeDevice
}