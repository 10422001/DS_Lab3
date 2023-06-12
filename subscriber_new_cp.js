const {Client} = require("pg")
// const credentials = { user: "postgres",
const credentials = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}
const insertSensor_old = async (timestamp, temperature, luminosity, airHumidity, soilHumidity) => {
    const client = new Client(credentials)

    try {
        await client.connect(); // gets connection

        await client.query(
            "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity) VALUES ($1, $2, $3, $4, $5)",
            [timestamp, temperature, luminosity, airHumidity, soilHumidity]); // sends queries



        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();
    }
};
// const insertSensor = async (timestamp, temperature, luminosity, airHumidity, soilHumidity,light, water_pump, fan) => {
const insertSensor = async (temperature, luminosity, airHumidity, soilHumidity,light, water_pump, fan) => {
    const client = new Client(credentials)
// console.log(light, water_pump, fan)
console.log(temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan)
    try {
        await client.connect(); // gets connection
        await client.query(
            // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES ($1, $2, $3, $4, $5,$6, $7, $8)",
            "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES ($1, $2, $3, $4, $5,$6, $7, $8)",
            [temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();
    }
};


// await client.connect(); // gets connection
// await client.query(
//     "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES ($1, $2, $3, $4, $5,$6, $7, $8)",
//     [timestamp, temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan]); // sends queries
// return true;

// light = false
// waterPump = false
// fan = false
const insertSensorOnOff = async (light, water_pump, fan) => {
    const client = new Client(credentials)
    console.log(light, water_pump, fan)
    try {
        await client.connect(); // gets connection
        await client.query(
            "INSERT INTO sensor (light, water_pump, fan ) VALUES ($1, $2, $3)",
            [light, water_pump, fan]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();
    }
};


const queryDb = async (tab, val) => {
    const client = new Client(credentials)

    try {
        const query = "SELECT * from " + tab + " WHERE temperature = $1"
        const values = [val]
        await client.connect()
        const res = await client.query(query, values)
        console.log(res.rows[0])
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
// queryDb('sensor', 25)
// queryDb('sensor', 29)

const connectDb = async () => {
    const client = new Client(credentials)

    try {
        await client.connect()
        // const res = await client.query("SELECT * from sensor") //console.log(res)
        const res = await client.query("SELECT * from sensor ORDER BY timestamp ASC") //console.log(res)
        // const res =  client.query("SELECT * from sensor") //console.log(res)
        // console.log(res.rows[0]["timestamp"])
        // console.log(res.rows)
        await client.end()
        // console.log(res.rows[0]["timestamp"])  client.end()
        lastxItems = 30
        for (let i = 0; i < lastxItems; i++) {
            console.log(res.rows[i]["timestamp"] + "\t " + res.rows[i]["temperature"] + "\t " + res.rows[i]["humidity"]
                + "\t " + res.rows[i]["luminosity"] + "\t " + res.rows[i]["air_humidity"])

        }

    } catch (error) {
        console.log(error)
    }
}
// connectDb()


// OTHER FUNCTIONS

light = false
water_pump = false
fan = false

// function insertSensorOnOffReadSubscriber(){
const insertSensorOnOffReadSubscriber = async () => {
    await insertSensorOnOff(light, water_pump, fan)
}
// The temperature range between 27-30 degrees Celsius
// q The soil humidity from 50% to 60%
// q The air humidity greater or equal to 70%
// q The pH ranging from 5 to 7 q
// The luminosity less than 30
// lux.
// return date + " " + temp + " " + soil + " " + air + " " + pH + " " + luminosity

Modul2chechInputData = (messageArr) => {
    // console.log(messageArr[1])
    if (messageArr[0] > 30) {
        console.log("Temperature is not in range! , fan on")
        fan = true
    } else if (messageArr[0] < 27) {
        if (fan) {
            console.log("Temperature is under the range! , fan off")
        }
        fan = false
    }
    if (messageArr[1] < 50 || messageArr[1] > 60) {
        console.log("Soil humidity is not in range! , water pump on")
        water_pump = true
    } else {
        if (water_pump) {
            console.log("Soil humidity is again in range! , water pump off")
        }
        water_pump = false
    }
    if (messageArr[2] < 70) {
        console.log("Air humidity is not in range! , water pump on")
        water_pump = true
    } else {
        if (water_pump) {
            console.log("Air humidity is again in range! , water pump off")
        }
        water_pump = false
    }
    if (messageArr[3] < 5 || messageArr[3] > 7) {
        console.log("pH is not in range!")
    }
    if (messageArr[4] > 30) {
        console.log("Luminosity is not in range! light on")
        light = true
    } else {
        if (light) {
            console.log("Luminosity is again in range! light off")
        }
        light = false
    }
}

// FROM POSTGRESSSS
var mqtt = require('mqtt')
const {rows} = require("pg/lib/defaults");

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

    client.subscribe('dom');
    // client.subscribe('dom_bools');
    // client.subscribe('dom_temperature');
    // client.subscribe('dom_soil_humidity')
    // client.subscribe('dom_air_humidity')
    // client.subscribe('dom_pH_ranging')
    // client.subscribe('dom_luminosity')
})

// client.on('message', function (topic, message) {
//     console.log(message.toString())
// })
client.on('message', function (topic, message) {
    messageArr = message.toString().split(" ")
    // console.log(messageArr)
    Modul2chechInputData(messageArr);
    // console.log(messageArr[0].replace("T", " "))
    // insertSensor (messageArr[0],messageArr[1], messageArr[2], messageArr[3], messageArr[4], messageArr[5])
    // datetime =messageArr[0].replace("T", "-")

    // insertSensor(messageArr[0].replace("T", " "), messageArr[1], messageArr[2], messageArr[3], messageArr[4], messageArr[5])
    insertSensor(messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4],light, water_pump, fan)
    // insertSensorOnOff(light, water_pump, fan)
    console.log(messageArr)
// client.on('message', function (topic, message) {
//     // insertSensor (timestamp, temperature, luminosity, airHumidity, soilHumidity)
//     insertSensor ('1999-08-05 04:05:07',topic, topic, topic, topic, topic)
//     switch (topic.toString()) {
//         case 'dom_temperature':
//             console.log("dom_temperature: " + message.toString())
//             break;
//         case 'dom_soil_humidity':
//             console.log("dom_soil_humidity: " + message.toString())
//             break;
//         case 'dom_air_humidity':
//             console.log("dom_air_humidity: " + message.toString())
//             break;
//         case 'dom_pH_ranging':
//             console.log("dom_pH_ranging: " + message.toString())
//             break;
//         case 'dom_time':
//             console.log("dom_time: " + message.toString())
//             break;
//         case 'dom_luminosity':
//             console.log("dom_luminosity: " + message.toString())
//             break;
//
//         default:
//             console.log("default: " + message.toString())
//     }
})

// connectDb()
