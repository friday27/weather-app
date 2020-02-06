const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname); //path of the current script
// console.log(__filename); //path to this file

// Create an Express application
const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
// http://expressjs.com/en/4x/api.html#app.set
app.set('view engine', 'hbs'); //handlebar extension
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    //render one of the views
    // param1: name of the view
    // param2: data obj which can be fetched by .hbs
    res.render('index', { 
        title: 'Weather App',
        name: 'Lily Potter'
    }); 
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lily Potter'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Harry Potter',
        helpMsg: 'I am here to help :)'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lily Potter',
        errorMessage: 'Help article not found.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(lat, long, (error, forecastMsg) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastMsg,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

//Everything that isn't listed above
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lily Potter',
        errorMessage: 'Page not found.'
    })
});

// Start the server
// Access the app in browser by http://localhost:3000/
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});