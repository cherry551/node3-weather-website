const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

const app  = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locaion
app.set('views', viewsDirectory)
app.set('view engine', 'hbs' )
hbs.registerPartials(partialPath)

// Setup static directorty to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tj Cherry'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Tj Cherry'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tj Cherry'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    
    geocode(req.query.address, (error, {Latitude, Longitude, Location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forcast(Latitude, Longitude, (error, response) => {
            if (error){
                return res.send( { error } )
            } 

            res.send({
                forcast: response,
                location: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tj Cherry',
        error: 'Help page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tj Cherry',
        error: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})