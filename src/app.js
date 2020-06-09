const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harish Balaji'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harish Balaji'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpMsg: "If you have any issues with this website, contact 8056136872",
        title: 'Help',
        name: 'Harish Balaji'
    })
})

// app.get('',(req,res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send({
//         name: 'Harish',
//         age: 21
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('<title>About</title>')
// })

app.get('/weather',(req,res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide address term!'
        })
    }    
    
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error,forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                givenAddress: address,
                location,
                forecast: forecastData
            })
        })  
    })    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term!'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        helpMsg: 'Help Article not found',
        title: '404 help',
        name: 'Harish Balaji'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        helpMsg: 'Page not found',
        title: '404 error',
        name: 'Harish Balaji'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Serving is up and running at port '+ port)
})