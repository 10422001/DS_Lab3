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

// client.on('message', function (topic, message) {
//     messageArr = message.toString().split(" ")
//     insertSensor (messageArr[0],messageArr[1], messageArr[2], messageArr[3], messageArr[4], messageArr[5])
//     console.log(messageArr)
client.on('message', function (topic, message) {
    // insertSensor (timestamp, temperature, luminosity, airHumidity, soilHumidity)
    // insertSensor ('1999-08-05 04:05:07',topic, topic, topic, topic, topic)
    switch (topic.toString()) {
        case 'dom_temperature':
            console.log("dom_temperature: " + message.toString())
            break;
        case 'dom_soil_humidity':
            console.log("dom_soil_humidity: " + message.toString())
            break;
        case 'dom_air_humidity':
            console.log("dom_air_humidity: " + message.toString())
            break;
        case 'dom_pH_ranging':
            console.log("dom_pH_ranging: " + message.toString())
            break;
        case 'dom_time':
            console.log("dom_time: " + message.toString())
            break;
        case 'dom_luminosity':
            console.log("dom_luminosity: " + message.toString())
            break;

        default:
            console.log("default: " + message.toString())
    }
})

const date = new Date()

setInterval(function () {
insertSensor(date.toString(), temperature, luminosity, airHumidity, soilHumidity)
}, 5000)

queryDb('sensor', 26)
