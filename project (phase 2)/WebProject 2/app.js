const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const products = require("../WebProject 2/vdb/products.json");

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: "Time Zone",
        products: products.data,
    });
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


app.post("/delete", (req, res) => {
    const { id } = req.body;
    products.data = products.data.filter(product => product.id != id);
    res.render("home.hbs", {
        title: "Time Zone",
        products: products.data,
    });
});

app.post("/editAndUpdate", (req, res) => {
    const { id, title, price } = req.body;
    var index = products.data.findIndex((product) => product.id == id);
    if (index != -1) {
        products.data[index].title = title;
        products.data[index].price = price;
    } else {
        var temp = {
            id: products.data.length + 1,
            title,
            image: "images/container4/img1_container4.png",
            price,
        };
        products.data.push(temp);
    }
    res.render("home.hbs", {
        title: "Time Zone",
        products: products.data,
    });
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const port = 3000;
app.listen(port, () => console.log(`virtual server listening at http://localhost:${port}`));