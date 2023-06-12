

// const mqtt = require('mqtt')
// const clientMQTT = mqtt.connect('mqtt://broker.hivemq.com')
const clientMQTT = require('mqtt').connect('mqtt://broker.hivemq.com')
clientMQTT.on('connect',
    function () {clientMQTT.subscribe('dom');})

const {db_client} = require('./db_client.js')
light = false
water_pump = false
fan = false

const insertSensor = async (temperature, luminosity, airHumidity, soilHumidity,light, water_pump, fan) => {
    try {
        await db_client.connect(); // gets connection

        await db_client.query(
            // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES ($1, $2, $3, $4, $5,$6, $7, $8)",
            "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES ($1, $2, $3, $4, $5,$6, $7, $8)",
            [temperature,temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan]); // sends queries

        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await db_client.end();
    }
};












// OTHER FUNCTIONS



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



clientMQTT.on('message', function (topic, message) {
    messageArr = message.toString().split(" ")
    Modul2chechInputData(messageArr);
    insertSensor(messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4],light, water_pump, fan)
    console.log("sent to function insertSensor:\n" , messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4],light, water_pump, fan)
})





// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################


/*
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
*/


/*
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
}*/


/*
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
// connectDb()*/



/*const insertSensorOnOff = async (light, water_pump, fan) => {
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
};*/
