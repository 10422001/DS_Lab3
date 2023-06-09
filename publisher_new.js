


var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://broker.hivemq.com')

const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

newMessage_fillRandomSensor = (nrPlusMinus) => {
    // nrPlusMinus = 2
    temp = getRndInteger(24 - nrPlusMinus, 33+ nrPlusMinus).toString()
    soil = getRndInteger(50- nrPlusMinus, 60+ nrPlusMinus).toString()
    air = getRndInteger(70- nrPlusMinus, 100+ nrPlusMinus).toString()
    pH = getRndInteger(5- 1, 7+ 1).toString()
    luminosity = getRndInteger(0 - nrPlusMinus, 30+ nrPlusMinus).toString()
    console.log(temp + "\t" + soil + "\t" + air + "\t" + pH + "\t" + luminosity)
    return temp + " " + soil + " " + air + " " + pH + " " + luminosity
}

client.on('connect', function () {
    periodSensors = 1000;
    setInterval(function () {
        client.publish('dom', newMessage_fillRandomSensor(nrPlusMinus=2))
    }, periodSensors)
})

