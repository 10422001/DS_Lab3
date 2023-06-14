

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomFuncPublish = (name, min, max) => {
    // client.publish(name, getRndInteger(min, max).toString())
    newName = name + " " + getRndInteger(min, max).toString()
    client.publish(name, newName)
    // client.publish(name, getRndInteger(min, max).toString())

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
// const dateClass = new Date().getTimezoneOffset();

newMessage = () => {
    nrPlusMinus = 2
    // date = new Date(Date.now()).toISOString()
    temp = getRndInteger(24 - nrPlusMinus, 33+ nrPlusMinus).toString()
    soil = getRndInteger(50- nrPlusMinus, 60+ nrPlusMinus).toString()
    air = getRndInteger(70- nrPlusMinus, 100+ nrPlusMinus).toString()
    pH = getRndInteger(5- 1, 7+ 1).toString()
    luminosity = getRndInteger(0 - nrPlusMinus, 30+ nrPlusMinus).toString()
    // return date + " " + temp + " " + soil + " " + air + " " + pH + " " + luminosity
    return temp + " " + soil + " " + air + " " + pH + " " + luminosity
    // setIntervalRandomName('dom_temperature', 27, 30, periodSensors)
    // setIntervalRandomName('dom_soil_humidity', 50, 60, periodSensors)
    // setIntervalRandomName('dom_air_humidity', 70, 100, periodSensors)
    // setIntervalRandomName('dom_pH_ranging', 5, 7, periodSensors)
    // setIntervalRandomName('dom_luminosity', 0, 30, periodSensors)
}
client.on('connect', function () {
    periodSensors = 5000;
    setInterval(function () {
        client.publish('dom', newMessage())
    }, periodSensors)
    // setInterval(function () {client.publish('dom_time',
    //     '123123')
    // }, 1000)
    // setIntervalRandomName('dom_temperature', 27, 30, periodSensors)
    // setIntervalRandomName('dom_soil_humidity', 50, 60, periodSensors)
    // setIntervalRandomName('dom_air_humidity', 70, 100, periodSensors)
    // setIntervalRandomName('dom_pH_ranging', 5, 7, periodSensors)
    // setIntervalRandomName('dom_luminosity', 0, 30, periodSensors)


    // setInterval(function () {
    //     client.publish('dom_temperature', '1')
    // }, 1000)
    //
    // setInterval(function () {
    //     client.publish('dom_soil_humidity', '1')
    // }, 1000)
    //

    //
    // setInterval(function () {
    //     client.publish('dom_pH_ranging', '1')
    // }, 1000)
    // setInterval(function () {
    //     client.publish('dom_luminosity', '1')
    // }, 1000)
})

