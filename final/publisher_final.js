
const client = require('mqtt').connect('mqtt://broker.hivemq.com')

const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

exports.getRndInteger = getRndInteger
newMessage_fillRandomSensor = (nrPlusMinus) => {
    // nrPlusMinus = 2
    temp = getRndInteger(24 - nrPlusMinus, 33+ nrPlusMinus).toString()
    soil = getRndInteger(50- nrPlusMinus, 60+ nrPlusMinus).toString()
    air = getRndInteger(70- nrPlusMinus, 100+ nrPlusMinus).toString()
    pH = getRndInteger(5- 1, 7+ 1).toString()
    luminosity = getRndInteger(0 - nrPlusMinus, 30+ nrPlusMinus).toString()
    console.log(temp + "\t" + soil + "\t" + air + "\t" + pH + "\t" + luminosity+ "\t" + new Date().toString())
    // return temp + " " + soil + " " + air + " " + pH + " " + luminosity
    return temp + " " + soil + " " + air + " " + pH + " " + luminosity + " " + new Date().toString()
}

client.on('connect', function () {
    periodSensors = 2000;
    setInterval(function () {
        client.publish('dom', newMessage_fillRandomSensor(nrPlusMinus=2))
    }, periodSensors)
})

