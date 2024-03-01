const Topo = require('../models/topo.model');
const Device = require('../models/device.model');

const getTopoById = async (req, res) => {
    const topo = await Topo.findById(req.params.id).populate("pcs").populate("sws").populate("routers");
    console.log("topo: ", topo);
    res.json(topo);
}


module.exports = {
    getTopoById,
}