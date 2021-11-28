const request = require('request')

const geocode=(address,callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=2&access_token=pk.eyJ1IjoibXVoYW1tYWRmYWl6YW52ZW5kIiwiYSI6ImNrdXFuZmJuNjNtZzEyb3Q5OXZqajdoankifQ.UC0f7D36uLdpHGxAHj_FfQ&limit=1';
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('error while connecting to weather stack',undefined)

        } else {
            let features = response.body.features;
            if (features && features.length > 0) {
                let center = features[0].center;
                callback(undefined,{latitude:center[1],longitude:center[0],place:features[0].place_name})
            } else {
                callback('unable to find lat long for given location',{})
            }
        }

    })
}
module.exports={geocode}
