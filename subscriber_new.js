// const mqtt = require('mqtt')
// const clientMQTT = mqtt.connect('mqtt://broker.hivemq.com')
const clientMQTT = require('mqtt').connect('mqtt://broker.hivemq.com')
clientMQTT.on('connect',
    function () {
        clientMQTT.subscribe('dom');
    })

const {client_db} = require('./db_client.js')
let light = false
let water_pump = false
let fan = false
const dateObject = new Date();
const insertSensor = async (temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan) => {
    try {
        await client_db.connect(); // gets connection
        // const result = await db_client.query('SELECT NOW()')
        // console.log(result.rows[0])

        await client_db.query(
            // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES ($1, $2, $3, $4, $5,$6, $7, $8)",
            "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES ($1, $2, $3, $4, $5,$6, $7, $8)",
            [temperature, temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan]); // sends queries

        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client_db.end();
    }
};

const insertSensorNewAlt = async (temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan) => {
    try {
        await client_db.connect(); // gets connection
        await client_db.query('BEGIN')

        // const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
        // const res = await client_db.query(queryText, ['brianc'])
        // const serverTime = await client_db.query('SELECT NOW() AT TIME ZONE \'UTC\'::timestamp')

        // const serverTime = await client_db.query('SELECT now()')
        // currentDBTime = serverTime.rows[0]["now"]
        // currentDBTime = serverTime.rows[0]["now"]
        // console.log(currentDBTime)
        /*       currentDBTime = dateObject.toISOString();
               console.log(currentDBTime)
               console.log(currentDBTime.replace('T', '\ '))
               // currentDBTime = currentDBTime.replace('T', '\ ')
               console.log(currentDBTime)

               console.log('-----------------------------------')
               console.log(currentDBTime, temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan)
               console.log('-----------------------------------')
               // temp + " " + soil + " " + air + " " + pH + " " + luminosity
               await client_db.query(
                   // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES ($1, $2, $3, $4, $5,$6, $7, $8)",
                   "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity,light, water_pump, fan) VALUES (, $2, $3, $4, $5,$6, $7, $8)",
                   [currentDBTime.replace('T', '\ '), temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan]); // sends queries
       */

        const currentDBTime = dateObject.toISOString();

        await client_db.query(
            "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES (to_timestamp($1, 'YYYY-MM-DD\"T\"HH24:MI:SS.MSZ'), $2, $3, $4, $5, $6, $7, $8)",
            [currentDBTime, temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan]);

        // const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
        // const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
        // await client_db.query(insertPhotoText, insertPhotoValues)

        await client_db.query('COMMIT')
    } catch (e) {
        await client_db.query('ROLLBACK')
        throw e
    } finally {
        // client_db.end()
    }
}
notConnected = true
const connectOnce = async () => {
    if (notConnected) {
        try {
            // if (notConnected){
            await client_db.connect();
            notConnected = false
            // return true
        } catch (error) {
            console.error(error.stack);
            // return false;
        }
    }
}
// const insertSensorNew = async (temperature, luminosity, airHumidity, soilHumidity, light, water_pump, fan) => {
const insertSensorNew = async (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) => {
    try {
        // if (client_db.await client_db.connect(); // gets connection
        await connectOnce()
        await client_db.query('BEGIN')

        const currentDBTime = new Date().toISOString();

        await client_db.query(
            // "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES (to_timestamp($1, 'YYYY-MM-DD\"T\"HH24:MI:SS.MSZ'), $2, $3, $4, $5, $6, $7, $8)",
            "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan) VALUES (to_timestamp($1, 'YYYY-MM-DD\"T\"HH24:MI:SS.MSZ'), $2, $3, $4, $5, $6, $7, $8)",
            [currentDBTime, temperature, luminosity, air_humidity, soil_humidity, light, water_pump, fan]);

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
//22      62      99      8       14

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
    console.log(messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan)
    // insertSensor(messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan)
    insertSensorNew(messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan)
    // console.log("sent to function insertSensor:\n", messageArr[0], messageArr[1], messageArr[2], messageArr[3], messageArr[4], light, water_pump, fan)
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
