

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

randomFuncPublish = (name, min, max) => {
    // getRndIntegerVal = getRndInteger(min, max)
    client.publish(name, getRndInteger(min, max).toString())
    // client.publish(name, getRndIntegerVal.toString())
}

setIntervalRandomName = (name, min, max, period) => {
    setInterval(function () {
        randomFuncPublish(name, min, max)
    }, period)
}
var mqtt = require('mqtt')

// var client = mqtt.connect('mqtt://test.mosquitto.org')
// var client = mqtt.connect('mqtt://localhost')
var client = mqtt.connect('mqtt://broker.hivemq.com')

// var client = mqtt.connect('test.mosquitto.org')

// The temperature range between 27-30 degrees Celsius
// q The soil humidity from 50% to 60%
// q The air humidity greater or equal to 70%
// q The pH ranging from 5 to 7 q
// The luminosity less than 30
// lux.
client.on('connect', function () {
    setIntervalRandomName('dom_temperature', 27, 30, 1000)
    setIntervalRandomName('dom_soil_humidity', 50, 60, 1000)
    setIntervalRandomName('dom_air_humidity', 70, 100, 1000)
    setIntervalRandomName('dom_pH_ranging', 5, 7, 1000)
    setIntervalRandomName('dom_luminosity', 0, 30, 1000)

    // setInterval(function () {
    //     client.publish('dom_temperature', '1')
    // }, 1000)
    //
    // setInterval(function () {
    //     client.publish('dom_soil_humidity', '1')
    // }, 1000)
    //
    // setInterval(function () {
    //     client.publish('dom_air_humidity', '1')
    // }, 1000)
    //
    // setInterval(function () {
    //     client.publish('dom_pH_ranging', '1')
    // }, 1000)
    // setInterval(function () {
    //     client.publish('dom_luminosity', '1')
    // }, 1000)
})

