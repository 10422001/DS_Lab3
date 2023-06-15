

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

randomFuncPublish = (name, min, max) => {
    newName = name+" " + getRndInteger(min, max).toString()
    client.publish(name, newName)
}

setIntervalRandomName = (name, min, max, period) => {
    setInterval(function () {
        randomFuncPublish(name, min, max)
    }, period)
}
var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', function () {
    periodSensors = 5000;
    plusminus = 2
    setIntervalRandomName('dom_temperature', 27 - plusminus, 30 + plusminus, periodSensors)
    setIntervalRandomName('dom_soil_humidity', 50 - plusminus, 60+ plusminus, periodSensors)
    setIntervalRandomName('dom_air_humidity', 70 - plusminus, 100+ plusminus, periodSensors)
    setIntervalRandomName('dom_pH_ranging', 5 - 1, 7+ 1, periodSensors)
    setIntervalRandomName('dom_luminosity', 0, 30, periodSensors)
})

