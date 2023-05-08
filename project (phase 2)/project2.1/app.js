const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const products = require("./allJsonData.json");
app.get('/', (req, res) => {
    res.render('index.hbs')
});
app.get('/shop', (req, res) => {
    res.render('shop.hbs', {
        products: products.data,
    });
});
app.post("/delete", (req, res) => {
    const { id } = req.body;
    products.data = products.data.filter(product => product.id != id);
    res.render("index.hbs", {
        products: products.data,
    });
});
app.post("/add", (req, res) => {
    products.data.push({
        id: products.data.length + 1,
        title: `کالای جدید ${products.data.length + 1}`,
        image: "images/product-img/product3.jpg",
        price: products.data.length * 100,
    });
    res.render("index.hbs", {
        products: products.data,
    });
});
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const port = 3003;
app.listen(port, () => console.log(`virtual server listening at http://localhost:${port}`));