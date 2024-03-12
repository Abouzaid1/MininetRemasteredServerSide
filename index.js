require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');




const app = express();
const httpStatusText = require('./utils/httpStatusText');


const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log('mongodb server started')
})

app.use(cors())
app.use(express.json());

const deviceRouter = require('./routes/device.route');
const topoRouter = require('./routes/topo.route');
const textRouter = require('./routes/text.route');
const linkRouter = require('./routes/link.route');


app.use('/api/topo', topoRouter)
app.use('/api/device', deviceRouter)
app.use('/api/text', textRouter)
app.use('/api/link', linkRouter)


// global middleware for not found router
app.all('*', (req, res, next) => {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available' })
})

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
})
app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port: 4000');
});
