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

let temperature=-99
let luminosity= -99
let airHumidity=-99
let soilHumidity=-99
let ph=-99

client.on('message', function (topic, message) {
    switch (topic.toString()) {
        case 'dom_temperature':
            temperature = message.toString()
            console.log("dom_temperature: " + temperature)
            break;
        case 'dom_soil_humidity':
            soilHumidity = message.toString()
            console.log("dom_soil_humidity: " + soilHumidity)
            break;
        case 'dom_air_humidity':
            airHumidity = message.toString()
            console.log("dom_air_humidity: " + airHumidity)
            break;
        case 'dom_pH_ranging':
            ph = message.toString()
            console.log("dom_pH_ranging: " + ph)
            break;
        // case 'dom_time':
        //     temperature = message.toString()
        //     console.log("dom_time: " + message.toString())
        //     break;
        case 'dom_luminosity':
            luminosity = message.toString()
            console.log("dom_luminosity: " + luminosity)
            break;

        default:
            console.log("default: " + message.toString())
    }
})

// queryDb('sensor', 26)





const date = new Date()

setInterval(function () {
insertSensor(date.toString(), temperature, luminosity, airHumidity, soilHumidity)
}, 5000)
