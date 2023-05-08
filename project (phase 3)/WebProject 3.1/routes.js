const express = require('express');
const path = require('path');
const hbs = require('hbs');
const watchInfo = require('./watch');
const Users = require('./user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./passport')(passport);
const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
const saltRounds = 10;
//---------------------------------------------------------------------------------------------------//

app.get('/login', (req, res) => {
    res.render('login and register.hbs', {
        title: 'Login & Register'
    });
});
app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});
app.post('/register', (req, res) => {
    const { username, email, password, repassword } = req.body;
    let errors = [];
    if (password !== repassword) {
        errors.push({ msg: 'Passwords not match!\n' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Passwords should be at least 6 characters!\n' });
    }
    if (errors.length > 0) {
        res.render('login and register.hbs', {
            title: 'Login & Register',
            errors: errors,
        });
    } else {
        Users.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'This email already exist!\n' });
                res.render('login and register.hbs', {
                    title: 'Login & Register',
                    errors: errors,
                });
            } else {
                const newUser = new Users({ username, email, password });
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        console.log(hash);
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered');
                                console.log(user);
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        }).catch(err => console.log(err));
    }
});
//---------------------------------------------------------------------------------------------------//
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
//---------------------------------------------------------------------------------------------------//
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
//---------------------------------------------------------------------------------------------------//
module.exports = app;