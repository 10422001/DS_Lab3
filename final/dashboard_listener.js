
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

clientMQTT.on('connect',
    function () {
        clientMQTT.subscribe('dom');
    })

const {client_db} = require('../db_client.js')

// define variables, and Date
let light = false
let water_pump = false
let fan = false
const dateObject = new Date();
notConnected = true

clientMQTT.on('message', function (topic, message) {
    messageArr = message.toString().split(" ")
    currentTime = dateObject.toString().split(" ")[4].split(":").slice(0, 2).join(":")
    // Modul2chechInputData(messageArr);
    console.log(currentTime,messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan)
    // insertSensorNew(messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan)
    console.log()
})
