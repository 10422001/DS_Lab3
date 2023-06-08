var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://broker.hivemq.com')
// var client = mqtt.connect('mqtt://test.mosquitto.org')
// var client = mqtt.connect('mqtt://localhost')
// var client = mqtt.connect('test.mosquitto.org')

// client.on('connect', function () {client.subscribe('xxx_temperature')})


// The temperature range between 27-30 degrees Celsius
// q The soil humidity from 50% to 60%
// q The air humidity greater or equal to 70%
// q The pH ranging from 5 to 7 q
// The luminosity less than 30
// lux.
client.on('connect', function () {

    client.subscribe('dom_temperature');
    client.subscribe('dom_soil_humidity')
    client.subscribe('dom_air_humidity')
    client.subscribe('dom_pH_ranging')
    client.subscribe('dom_luminosity')
})

client.on('message', function (topic, message) {
    console.log(message.toString())
})
