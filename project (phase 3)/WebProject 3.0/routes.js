const express = require('express');
const path = require('path');
const hbs = require('hbs');
const watchInfo = require('./watch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));

app.get('/', async(req, res) => {
    const watchs = await watchInfo.find({});
    try {
        res.render('home.hbs', {
            title: "Time Zone",
            products: watchs,
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/', async(req, res) => {
    const watch = new watchInfo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        image: 'images/container4/img1_container4.png',
        price: req.body.price,
    });
    try {
        await watch.save();
    } catch (err) {
        res.status(500).send(err);
    }
    res.redirect('/');
});

app.put('/:id', async(req, res) => {
    console.log('--------------------------------------------------------');
    console.log(req.params.id);
    console.log(req.body.title);
    console.log(req.body.price);
    console.log('--------------------------------------------------------');
    try {
        await watchInfo.findByIdAndUpdate({ "$oid": req.params.id }, {
            $set: {
                title: req.body.title,
                price: req.body.price,
            }
        }, { new: true });
        await watchInfo.save();
    } catch (err) {
        res.status(500).send(err);
    }
    res.redirect('/');
});

app.delete('/:id', async(req, res) => {
    try {
        await watchInfo.findByIdAndDelete(req.params.id);
    } catch (err) {
        res.status(500).send(err);
    }
    res.redirect('/');
});

app.get('/shop', (req, res) => {
    res.render('shop.hbs', {
        title: "Shop - Time Zone",
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About - Time Zone",
    });
});
app.get('/latest', (req, res) => {
    res.render('latest.hbs', {
        title: "Latest - Time Zone",
    });
});
app.get('/blog', (req, res) => {
    res.render('blog.hbs', {
        title: "Blog - Time Zone",
    });
});
app.get('/pages', (req, res) => {
    res.render('pages.hbs', {
        title: "Pages - Time Zone",
    });
});
app.get('/contact', (req, res) => {
    res.render('contact.hbs', {
        title: "Contact - Time Zone",
    });
});

module.exports = app;