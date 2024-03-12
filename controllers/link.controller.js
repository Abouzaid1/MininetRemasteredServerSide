const Link = require('../models/link.model');
const Topo = require('../models/topo.model');
const addLink = async (req, res) => {
  const foundedLink = await Link.findOne({link:req.body.link})  
  console.log(foundedLink);
  if(foundedLink){
    res.json("link is already here")
  }else{
      const newLink = new Link(req.body);
      console.log(newLink);
      await newLink.save();
      const topo = await Topo.findById(req.body.topoId);
      topo.links.push(newLink._id);
      await topo.save();
      res.json("link is created successfully")
  }
}
module.exports = {
    addLink,
}