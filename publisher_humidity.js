


var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
    setInterval(function()
    {client.publish('xxx_humidity', '10000')},1000)})
