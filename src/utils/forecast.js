const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8c95c47fdcbeccd7c4cc9d0153623bb9&query=' +latitude+','+ longitude+''

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find the location! Try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature +' degrees out. It feels like '+ body.current.feelslike+' degrees out. Precipitation level is '+ body.current.precip+' mm. Humidity is '+ body.current.humidity+'%.')
        }
    })

}

module.exports = forecast