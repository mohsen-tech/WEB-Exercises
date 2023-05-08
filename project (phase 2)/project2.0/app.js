const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const db = require('./db');
const { title } = require('process');
const dbName = 'products';
const collectionName = 'data';
app.get('/', (req, res) => {
    res.render('index.hbs')
});
db.initialize(dbName, collectionName, function(dbCollection) {
    var dbSize;
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        dbSize = result.length;
    });
    app.get('/shop', (req, res) => {
        dbCollection.find({}).toArray((error, result) => {
            if (error) throw error;
            res.render('shop.hbs', {
                products: result,
            });
            dbSize = result.length;
        });
    });
    app.post('/add', (req, res) => {
        const item = {
            id: dbSize + 1,
            title: `کالای جدید ${dbSize + 1}`,
            image: 'images/product-img/product3.jpg',
            price: (dbSize + 1) * 1000,
        };
        dbCollection.insertOne(item, (error, result) => {
            if (error) throw error;
            dbCollection.find().toArray((_error, _result) => {
                if (_error) throw _error;
                res.redirect('/shop');
            });
        });
    });
    app.post('/delete', (req, res) => {
        const { id } = req.body;
        console.log('Delete item with id: ', id);
        dbCollection.deleteOne({ id: parseInt(id) }, function(error, result) {
            if (error) throw error;
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                res.redirect('/shop');
            });
        });
    });
}, function(err) {
    throw (err);
});
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const port = 3003;
app.listen(port, () => console.log(`virtual server listening at http://localhost:${port}`));