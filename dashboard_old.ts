const {Client} = require("pg")
// const credentials = { user: "postgres",
const credentials = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}
const dashboard_old = async () => {
    const client = new Client(credentials)

    try {
        await client.connect()
        const res = await client.query("SELECT * from sensor ORDER BY timestamp ASC") //console.log(res)
        await client.end()
        // console.log(res.fields[0].name + "\t\t " + res.fields[1].name
        //     + "\t " + res.fields[2].name
        //     + "\t " + res.fields[2].name
        //     + "\t " + res.fields[3].name
        //     + "\t " + res.fields[4].name)
        let lastxItems: number = 5
        // for (let i = 0; i < lastxItems; i++) {
        //     console.log(res.rows[i]["timestamp"] + "\t\t " + res.rows[i]["temperature"] + "\t\t " + res.rows[i]["humidity"]
        //         + "\t\t " + res.rows[i]["luminosity"] + "\t\t " + res.rows[i]["air_humidity"])
        // }


        let outputconcat: string = ""
        for (let j = 0; j < lastxItems; j++) {
            outputconcat += res.fields[j].name + "\t"
        }
        console.log(outputconcat)
        outputconcat = ""
        for (let j = 0; j < lastxItems; j++) {
            for (let i = 0; i < lastxItems; i++) {
                if (i == 0) {
                    // let timestamp = new Date(res.rows[j][res.fields[i].name])
                    let timestamp = res.rows[j][res.fields[i].name]
                    outputconcat += timestamp + "\t\t "
                } else {
                    outputconcat += res.rows[j][res.fields[i].name] + "\t\t "
                }
            }
            console.log(outputconcat)
            outputconcat = ""
        }
    } catch (error) {
        console.log(error)
    }
}
dashboard_old()
