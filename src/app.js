const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirPath));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kalu Patrick'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Kalu Patrick'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        const data = {
            error: 'You must provide a search term'
        };
        return res.send(data);
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });

        });
    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});


app.get('/help', (req, res) => {

    res.render('about', {
        title: 'Help page',
        name: 'Kalu Patrick',
        helpText: 'This is the help section'
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help page',
        name: 'Kalu Patrick',
        errorMessage: 'Help Page not found'
    });
});


app.get('*', (req, res) => {

    res.render('404', {
        title: '404 page',
        name: 'Kalu Patrick',
        errorMessage: 'Page Not Found'
    });
});





app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});