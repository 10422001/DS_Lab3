const {Client} = require("pg")
// const credentials = { user: "postgres",
const credentials = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}


const connectDb = async () => {
    const client = new Client(credentials)

    try {
        await client.connect()
        // const res = await client.query("SELECT * from sensor") //console.log(res)
        const res = await client.query("SELECT * from sensor ORDER BY timestamp ASC") //console.log(res)
        // const res =  client.query("SELECT * from sensor") //console.log(res)
        console.log(res.rows[0]["timestamp"])
        // console.log(res.rows)
        await client.end()
        // console.log(res.rows[0]["timestamp"])  client.end()
    } catch (error) {
        console.log(error)
    }
}
connectDb()


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
// closes connection
// insertSensor('1999-08-05 04:05:10', 25, 15, 45, 65).then(result => {
//     if (result) {
//         console.log('data inserted');
//     }
// });

// insertSensor(new Date(Date.now()).toISOString(), 25, 15, 45, 65).then(result => {
// insertSensor(new Date().toUTCString(), 25, 15, 45, 65).then(result => {
// console.log(new Date(Date.now()).toISOString().replace("T"," "))
// insertSensor(new Date(Date.now()).toISOString().replace("T"," "), 25, 15, 45, 65).then(result => {
insertSensor(new Date(Date.now()).toISOString().replace("T"," "), 26, 15, 45, 65).then(result => {
    if (result) {
        console.log('data inserted');
    }
});

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
queryDb('sensor', 26)


// const insertSensor = async (timestamp, temperature, luminosity, airHumidity, soilHumidity) => {
//     try {
//         await client.connect(); // gets connection await client.query(
//         "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity) VALUES ($1, $2, $3, $4, $5)", [timestamp, temperature, luminosity, airHumidity, soilHumidity]
//     )
//         ; // sends queries
//     }
// };
// return true;
// } catch
// (error)
// {
//     console.error(error.stack);
//     return false;
// }
// finally
// {
// // client.end();
//     await client.end();
// // closes connection
//     insertSensor('1999-08-05 04:05:07', 25, 15, 45, 65).then(result => {
//         if (result) {
//             console.log('data inserted');
//         }
//     });
