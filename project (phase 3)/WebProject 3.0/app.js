const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes.js');
const app = express();
const dbConnectionUrl = ' ';

mongoose.connect(dbConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db connected!')).catch((err) => console.log(err));
app.use(router);
const port = 3000;
app.listen(port, () => console.log(`virtual server listening at http://localhost:${port}`));