const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHVja2VyY2hlcnJ5NSIsImEiOiJja2l6bmNjdm4wNTlnMnNsbm1vNG1uMWpjIn0.EMP10kySdFh8FKQb35afyA&limit=1'

    request({url, json: true }, (error, {body} = {}) => {
        if(error) {
            callback('Cannot connect to Geo Service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                Latitude: body.features[0].center[0],
                Longitude: body.features[0].center[1],
                Location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode

