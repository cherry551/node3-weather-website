const request = require('request')

const forcast = (a, b, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cefbf54fde65d42f3c3a04db61bf0446&query=' + encodeURIComponent(a) + ',' + encodeURIComponent(b) + '&units=f'

    request({url, json: true}, (error, {body} = {}) =>{
        if(error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'The current forcast for this area is: ' + body.current.weather_descriptions[0])
        }
    })

}

module.exports = forcast


// const url = 'http://api.weatherstack.com/current?access_key=cefbf54fde65d42f3c3a04db61bf0446&query=&units=f'


// request({ url: url, json: true }, (error, response) => {
//     if (error){
//         console.log('Unable to connect to the weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0])
//     }
// })