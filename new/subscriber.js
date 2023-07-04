const {Client} = require("pg")
// const credentials = { user: "postgres",
const credentials = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}
const insertSensor = async (timestamp, temperature, luminosity, airHumidity, soilHumidity) => {
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
const {client_db} = require("../db_client");
const {pool_new} = require("./db_client_pool");

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.hivemq.com')
client.on('connect', function () {
    client.subscribe('dom_temperature');
    client.subscribe('dom_soil_humidity')
    client.subscribe('dom_air_humidity')
    client.subscribe('dom_pH_ranging')
    client.subscribe('dom_luminosity')

})



let timestamp=-99

// let temperature=-99
// let luminosity= -99
// let airHumidity=-99
// let soilHumidity=-99
// let ph=-99

let temperature=require('./vars').temperature
let luminosity= require('./vars').luminosity
let airHumidity=require('./vars').airHumidity
let soilHumidity=require('./vars').soilHumidity
let ph=require('./vars').ph

client.on('message', function (topic, message) {
    switch (topic.toString()) {
        case 'dom_temperature':
            temperature = message.toString().split(" ")[1]
            console.log("dom_temperature: " + temperature)
            break;
        case 'dom_soil_humidity':
            soilHumidity = message.toString().split(" ")[1]
            console.log("dom_soil_humidity: " + soilHumidity)
            break;
        case 'dom_air_humidity':
            airHumidity = message.toString().split(" ")[1]
            console.log("dom_air_humidity: " + airHumidity)
            break;
        case 'dom_pH_ranging':
            ph = message.toString().split(" ")[1]
            console.log("dom_pH_ranging: " + ph)
            break;
        // case 'dom_time':
        //     temperature = message.toString()
        //     console.log("dom_time: " + message.toString())
        //     break;
        case 'dom_luminosity':
            luminosity = message.toString().split(" ")[1]
            console.log("dom_luminosity: " + luminosity)
            break;

        default:
            console.log("default: " + message.toString())
    }
})

// queryDb('sensor', 26)


// let fan = false
// let water_pump = false
// let light = false

let fan = require('./vars').fan
let water_pump = require('./vars').water_pump
let light = require('./vars').light

Modul2chechInputData = () => {
    // console.log("Modul2chechInputData")
    // console.log("temperature: " + temperature)
    // console.log("luminosity: " + luminosity)
    // console.log("airHumidity: " + airHumidity)
    // console.log("soilHumidity: " + soilHumidity)
    // console.log("ph: " + ph)
    // console.log("fan: " + fan)
    // console.log("water_pump: " + water_pump)
    // console.log("light: " + light)
    // console.log("timestamp: " + timestamp)
    // console.log("Modul2chechInputData")

    // if (temperature > 30) {
    if (temperature > 30) {
        console.log("Temperature is not in range! , fan on")
        fan = true
    } else if (temperature < 27) {
        if (fan) {
            console.log("Temperature is under the range! , fan off")
        }
        fan = false
    }
    if (soilHumidity < 50 || soilHumidity > 60) {
        console.log("Soil humidity is not in range! , water pump on")
        water_pump = true
    } else {
        if (water_pump) {
            console.log("Soil humidity is again in range! , water pump off")
        }
        water_pump = false
    }
    if (airHumidity < 70) {
        console.log("Air humidity is not in range! , water pump on")
        water_pump = true
    } else {
        if (water_pump) {
            console.log("Air humidity is again in range! , water pump off")
        }
        water_pump = false
    }
    if (ph < 5 || ph > 7) {
        console.log("pH is not in range!")
    }
    if (luminosity > 30) {
        console.log("Luminosity is not in range! light on")
        light = true
    } else {
        if (light) {
            console.log("Luminosity is again in range! light off")
        }
        light = false
    }
}


client.on('connect', function () {
setInterval(function () {
    console.log("inside setInterval-fan,water,light")
    console.log("console.log(fan,water_pump,light)")
    console.log(fan,water_pump,light)
    client.publish("dom_fan", fan.toString())
    client.publish("dom_water_pump", water_pump.toString())
    client.publish("dom_light", light.toString())
}, 5000)

})

setInterval(function () {
    Modul2chechInputData();

    console.log('check input --------------------')
}, 5000)



const date = new Date()

        // const currentDBTime = new Date().toISOString();

// let temperature=require('./vars').temperature
// let luminosity= require('./vars').luminosity
// let airHumidity=require('./vars').airHumidity
// let soilHumidity=require('./vars').soilHumidity
// let ph=require('./vars').ph


setInterval(function () {
    insertSensorNew(new Date().toISOString(), temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan)

    // insertSensorNew(new Date().toISOString(), temperature, luminosity, airHumidity, soilHumidity)
}, 5000)

const insertSensorNew = async (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) => {
    try {

        // await connectOnce()
        pool_new.connect()
        let client_db = pool_new
        await client_db.query('BEGIN')

        const currentDBTime = new Date().toISOString();
        console.log(currentDBTime)
        await client_db.query(
            // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES (to_timestamp($1, 'YYYY-MM-DD\"T\"HH24:MI:SS.MSZ'), $2, $3, $4, $5, $6, $7, $8)",
            // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES (to_timestamp($1, 'YYYY-MM-DD\"T\"HH24:MI:SS.MSZ'), $2, $3, $4, $5, $6, $7, $8)",
            "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [currentDBTime, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan]);
        // return temp + " " + soil + " " + air + " " + pH + " " + luminosity + " " + new Date().toString()

        await client_db.query('COMMIT')
        const res = await client_db.query("SELECT * from sensor ORDER BY timestamp DESC") //console.log(res)
        console.log(res.rows[0])
        console.log('Transaction completed successfully.')

    } catch (e) {
        await client_db.query('ROLLBACK')
        console.log('Transaction failed to complete.', e)
    } finally {


        // client_db.release();
    }
}

// const db_client = await pool_new.connect()
