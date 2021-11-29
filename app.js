const express = require('express')
const path = require('path')
const hbs = require('hbs')
console.log(__dirname)
console.log(path.join(__dirname, '/public'))
const viewPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
const app = express()
const port=process.env.PORT || 5050
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname, '/public'), {
    extensions: ['html', 'htm'],

}))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Faizan',
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Faizan',
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'We need to help',
        name: 'Muhammad Faizan'
    })
});
app.get('/', (request, response) => {
    response.send({"name": 'hello world'})
})

app.get('/weather', (request, response) => {
    if (!request.query.location) {
        return response.send({error: 'Location is required'})
    }
    geocode.geocode(request.query.location, (err, {latitude, longitude, place: myPlace}) => {
        if (err) {
            return response.send({error: err})
        }
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return response.send({error: err})
            }
            response.send({
                'forecast':forecastData ,
                'location': request.query.location
            })
        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'faizan'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: 'You must provide search'})
    }
    console.log(req.query)
    res.send({'products': []})
});
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        name: 'faizan'

    })
})
app.listen(port, () => {
    console.log('server started at '+port)
})
