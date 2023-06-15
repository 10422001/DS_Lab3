const pg = require('pg')

const credentials = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}
/*
const pool = new pg.Pool(credentials);

exports.pool = pool
const db_client = new Client(credentials)
exports.client_db = db_client*/

// const pool = new Pool({
//     host: 'localhost',
//     user: 'database-user',
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// })

const credentials_new = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}
const { Pool } = require('pg')
const pool_new = new Pool({
    credentials ,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

exports.pool_new=pool_new


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
    // const db_client = new Client(credentials)
    // const db_client = new pool_new(credentials)
    try {
        // await db_client.connect()
        await pool_new.connect()
        const res = await pool_new.query("SELECT * from sensor ORDER BY timestamp DESC") //console.log(res)
        // const res = await db_client.query("SELECT * from sensor ORDER BY timestamp DESC") //console.log(res)
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
