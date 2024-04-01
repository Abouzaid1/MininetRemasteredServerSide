const Device = require('../models/device.model');
const httpStatusText = require('../utils/httpStatusText');
const Topo = require('../models/topo.model');
const getAllDevice = async (req, res) => {
    console.log(req.params);
    const devices = await Device.findById(req.params.id);
    topoId = req.params.id
    console.log("1");
    res.json(devices);
}
const addDevice = async (req, res) => {
    if (!req.body.name) {
        res.json("The device should has a host name")
    } else {

        const newDevice = new Device(req.body);
        const existingDevices = await Device.find({name:req.body.name})
        if (existingDevices.length == 0) {
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
        }else{
            res.json({msg: "Host name is taken"})
        }
       
    }
}
const removeDevice = async (req, res) => {
    const deviceId = req.params.id
    console.log(deviceId);
    const device = await Device.findById(deviceId);
    const type = device.type
    await Device.deleteOne({ _id: deviceId })
    await Topo.deleteOne({ _id: deviceId })
}
const updateDevice = async (req, res) => {
    const deviceId = req.body.id;
    const newPosition = req.body.position;
    console.log(newPosition);
    await Device.findByIdAndUpdate(deviceId, { position: newPosition });
}
module.exports = {
    getAllDevice,
    addDevice,
    removeDevice,
    updateDevice,
}