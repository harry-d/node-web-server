const fs = require('fs');
const express = require("express");
const hbs = require("hbs");
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//this is middleware
app.use((req, res, next) => {
    var msg = `${new Date().toString()}: ${req.method} ${req.url}`;
    fs.appendFile("server.log", msg + '\n', (err) => {
        if (err){
            console.log(err);
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance',
        message: 'Welcome!'
    });
});

//expose public directory html files
app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (s) => {
    return s.toUpperCase();
});


// request/response
app.get("/", (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Homepage',
        message: 'Welcome!'
    });
});


app.get("/about", (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "unable to handle request"
    });
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
