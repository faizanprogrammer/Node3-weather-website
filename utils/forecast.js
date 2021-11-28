const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9c3d4c9853d223a4f3424084f2251e2c&query=' + lat + ',' + long + '&units=f';
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('error while connecting to weather stack', undefined)
        } else if (response.body.error) {
            callback('unable to fetch weather for given location', undefined)
        } else {
            let current = response.body.current;
            callback(undefined, current.weather_descriptions[0] + ' it is currently ' + current.temperature + ' degrees out and it feels like ' + current.feelslike + ' degrees out')
            console.log()

        }
    })
}
module.exports = {forecast}
