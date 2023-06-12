
const {Client} = require("pg")
// const credentials = { user: "postgres",
const credentials = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}
/*const connectDb = async () => {
    const client = new Client(credentials)

    try {
        await client.connect()
        const res = await client.query("SELECT * from sensor ORDER BY timestamp ASC") //console.log(res)
        await client.end()
        console.log(res.fields[0].name +"\t\t " + res.fields[1].name
            +"\t " + res.fields[2].name
            +"\t " + res.fields[2].name
            +"\t " + res.fields[3].name
            +"\t " + res.fields[4].name)
        lastxItems = 5
        for (let i = 0; i < lastxItems; i++) {
            console.log(res.rows[i]["timestamp"] +"\t\t " + res.rows[i]["temperature"] +"\t\t " + res.rows[i]["humidity"]
                +"\t\t " + res.rows[i]["luminosity"]  +"\t\t " + res.rows[i]["air_humidity"] )
        }
        for (let j = 0; j < 10; j++) {
            stringout += res.fields[j].name +"\t\t "
        }
        for (let i = 0; i < lastxItems; i++) {
            for (let j = 0; j < 10; j++) {
                console.log(" ")
            }
            console.log(res.rows[i]["timestamp"] +"\t\t " + res.rows[i]["temperature"] +"\t\t " + res.rows[i]["humidity"]
                +"\t\t " + res.rows[i]["luminosity"]  +"\t\t " + res.rows[i]["air_humidity"] )
        }

    } catch (error) {
        console.log(error)
    }
}
connectDb()*/
