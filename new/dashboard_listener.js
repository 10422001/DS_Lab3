const clientMQTT = require('mqtt').connect('mqtt://broker.hivemq.com')

// const connectOnce = async () => {
//     if (notConnected) {
//         try {
//             await client_db.connect();
//             notConnected = false
//         } catch (error) {
//             console.error(error.stack);
//         }
//     }
// }
// const insertSensorNew = async (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) => {
//     try {
//         // if (client_db.await client_db.connect(); // gets connection
//         await connectOnce()
//         await client_db.query('BEGIN')
//
//         const currentDBTime = new Date().toISOString();
//         console.log(currentDBTime)
//         await client_db.query(
//             // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES (to_timestamp($1, 'YYYY-MM-DD\"T\"HH24:MI:SS.MSZ'), $2, $3, $4, $5, $6, $7, $8)",
//             // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES (to_timestamp($1, 'YYYY-MM-DD\"T\"HH24:MI:SS.MSZ'), $2, $3, $4, $5, $6, $7, $8)",
//             "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
//             [currentDBTime, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan]);
//
//         await client_db.query('COMMIT')
//         const res = await client_db.query("SELECT * from sensor ORDER BY timestamp DESC") //console.log(res)
//         console.log(res.rows[0])
//         console.log('Transaction completed successfully.')
//
//     } catch (e) {
//         await client_db.query('ROLLBACK')
//         console.log('Transaction failed to complete.', e)
//     } finally {
//
//
//         // client_db.release();
//     }
// }
//
// Modul2chechInputData = (messageArr) => {
//     if (messageArr[0] > 30) {
//         console.log("Temperature is not in range! , fan on")
//         fan = true
//     } else if (messageArr[0] < 27) {
//         if (fan) {
//             console.log("Temperature is under the range! , fan off")
//         }
//         fan = false
//     }
//     if (messageArr[1] < 50 || messageArr[1] > 60) {
//         console.log("Soil humidity is not in range! , water pump on")
//         water_pump = true
//     } else {
//         if (water_pump) {
//             console.log("Soil humidity is again in range! , water pump off")
//         }
//         water_pump = false
//     }
//     if (messageArr[2] < 70) {
//         console.log("Air humidity is not in range! , water pump on")
//         water_pump = true
//     } else {
//         if (water_pump) {
//             console.log("Air humidity is again in range! , water pump off")
//         }
//         water_pump = false
//     }
//     if (messageArr[3] < 5 || messageArr[3] > 7) {
//         console.log("pH is not in range!")
//     }
//     if (messageArr[4] > 30) {
//         console.log("Luminosity is not in range! light on")
//         light = true
//     } else {
//         if (light) {
//             console.log("Luminosity is again in range! light off")
//         }
//         light = false
//     }
// }

// clientMQTT.on('connect',
//     function () {
//         clientMQTT.subscribe('dom');
//     })

const {client_db} = require('../db_client.js')

// define variables, and Date
// let light = false
// let water_pump = false
// let fan = false
// const dateObject = new Date();
// notConnected = true

let temperature = require('./vars').temperature
let luminosity = require('./vars').luminosity
let airHumidity = require('./vars').airHumidity
let soilHumidity = require('./vars').soilHumidity
let ph = require('./vars').ph

let fan = require('./vars').fan
let water_pump = require('./vars').water_pump
let light = require('./vars').light


/*clientMQTT.on('message', function (topic, message) {
    messageArr = message.toString().split(" ")
    // currentTime = dateObject.toString().split(" ")[4].split(":").slice(0, 2).join(":")
    currentTime = dateObject.toString()
    // Modul2chechInputData(messageArr);
    console.log(messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan, currentTime)
    // console.log(currentTime,messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan)
    // console.log(currentTime,messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan, messageArr[5])
    // insertSensorNew(messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan)
    for (let i = 0; i <= 10; i++) {
        console.log()
    }
})*/


var client = require('mqtt').connect('mqtt://broker.hivemq.com')
client.on('connect', function () {
    client.subscribe('dom_temperature');
    client.subscribe('dom_soil_humidity')
    client.subscribe('dom_air_humidity')
    client.subscribe('dom_pH_ranging')
    client.subscribe('dom_luminosity')
})

client.on('message', function (topic, message) {
    switch (topic.toString()) {
        case 'dom_temperature':
            temperature = message.toString().split(" ")[1]
            // console.log("dom_temperature: " + temperature)
            break;
        case 'dom_soil_humidity':
            soilHumidity = message.toString().split(" ")[1]
            // console.log("dom_soil_humidity: " + soilHumidity)
            break;
        case 'dom_air_humidity':
            airHumidity = message.toString().split(" ")[1]
            // console.log("dom_air_humidity: " + airHumidity)
            break;
        case 'dom_pH_ranging':
            ph = message.toString().split(" ")[1]
            // console.log("dom_pH_ranging: " + ph)
            break;
        // case 'dom_time':
        //     temperature = message.toString()
        //     console.log("dom_time: " + message.toString())
        //     break;
        case 'dom_luminosity':
            luminosity = message.toString().split(" ")[1]
            // console.log("dom_luminosity: " + luminosity)
            break;

        default:
            console.log("default: " + message.toString())
    }
})
// var mqtt = require('mqtt')
const listenclient = require('mqtt').connect('mqtt://broker.hivemq.com')
listenclient.on('connect', function () {
    // listenclient.subscribe('dom_temperature');
    // listenclient.subscribe('dom_soil_humidity')
    // listenclient.subscribe('dom_air_humidity')
    // listenclient.subscribe('dom_pH_ranging')
    // listenclient.subscribe('dom_luminosity')
    listenclient.subscribe('dom_fan')
    listenclient.subscribe('dom_water_pump')
    listenclient.subscribe('dom_light')
})

listenclient.on('message', function (topic, message) {
    switch (topic.toString()) {
        case 'dom_fan':
            fan = message.toString().split(" ")[1]
            // console.log("dom_temperature: " + fan)
            break;
        case 'dom_water_pump':
            water_pump = message.toString().split(" ")[1]
            // console.log("dom_temperature: " + water_pump)
            break;
        case 'dom_light':
            light = message.toString().split(" ")[1]
            // console.log("dom_light: " + light)
            break;
    }}
)

// client.publish("dom_fan", fan.toString())
// client.publish("dom_water_pump", water_pump.toString())
// client.publish("dom_light", light.toString())

setInterval(function () {

    console.log(temperature, luminosity, airHumidity, soilHumidity, ph, light, water_pump, fan, new Date().toISOString())
    for (let i = 0; i <= 10; i++) {
        console.log()
    }
}, 1000)
