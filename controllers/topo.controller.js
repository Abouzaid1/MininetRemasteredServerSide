const Topo = require('../models/topo.model');
const Device = require('../models/device.model');
const getTopoById = async (req, res) => {
    const topo = await Topo.findById(req.params.id).populate("pcs").populate("sws").populate("laptops").populate("routers").populate("links").populate("controllers");
    res.json(topo);
}


module.exports = {
    getTopoById,
}