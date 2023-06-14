const {Client} = require("pg")

const credentials = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}

const db_client = new Client(credentials)
exports.client_db = db_client

function printHeader(res) {
    let headersColum = "";
    for (let i = 0; i < res.fields.length; i++) {
        headersColum += res.fields[i].name + "\t"
        if (i == 0 | i == 5) headersColum += "\t"
    }
    console.log(headersColum)
}
function printXItems(res, itemsToShow) {
    for (let i = 0; i < itemsToShow; i++) {
        let row = ""
        for (let j = 0; j < res.fields.length; j++) {
            row += res.rows[i][res.fields[j].name] + "\t"
            if (j == 0 | j == 1 | j == 2 | j == 3 | j == 4 | j == 5 | j == 6) row += "\t "
        }
        console.log(row)
    }
}

const dashboard = async () => {
    const db_client = new Client(credentials)
    try {
        await db_client.connect()
        const res = await db_client.query("SELECT * from sensor ORDER BY timestamp DESC") //console.log(res)
        printHeader(res)
        printXItems(res, 10)
        console.log(" ")

    } catch (error) {
        console.log(error)
    }
}

const dashboardInterval = () => {

    setInterval(function () {
        dashboard()
    }, 1000)
}
exports.dashboardInterval = dashboardInterval
// dashboardInterval()
