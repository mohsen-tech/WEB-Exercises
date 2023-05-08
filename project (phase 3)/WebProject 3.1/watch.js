const mongoose = require('mongoose');
const watchInfo = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    image: { type: String },
    price: { type: Number },
});
const Watchs = mongoose.model('info', watchInfo, 'info');
module.exports = Watchs;