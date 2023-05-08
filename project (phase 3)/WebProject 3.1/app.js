const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes.js');
const passport = require('./passport');
const app = express();
mongoose.connect('mongodb+srv://mohsen_tech:mohsen0930@webprojectcluster.oipym.mongodb.net/watch?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db connected!')).catch((err) => console.log(err));
app.use(router);
const port = 3000;
app.listen(port, () => console.log(`virtual server listening at http://localhost:${port}`));