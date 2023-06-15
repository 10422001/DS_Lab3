// const {dashboardInterval} = require('./db_client.js')
//
//
// dashboardInterval()

/*
const {Client} = require("pg");
const {pool} = require("./db_client_pool.js")
*/
// const credentials = {
//     user: "dominikocsofszki2",
//     host: "localhost",
//     database: "dominikocsofszki",
//     password: process.env.DB_PASSWORD,
//     port: 5432
// }
// const { Pool } = require('pg')
// const pool = new Pool({
//     credentials ,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// })

const {pool_new} = require('./db_client_pool')



function printHeader(res) {
    let headersColum = "";
    for (let i = 0; i < res.fields.length; i++) {
        headersColum += res.fields[i].name + "\t"
        // if (i == 0 | i == 5) headersColum += "\t"
        if ( i==4|i==6) headersColum += "\t"
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
    try {
        // const db_client = await pool.connect()
        const db_client = await pool_new.connect()
        const nrPrintItems = 10 //<<<<<<<<<<<<<<<<<Change here for printing more
        // await db_client.connect()
        const res = await db_client.query("SELECT * from sensor ORDER BY timestamp DESC") //console.log(res)
        printHeader(res)
        printXItems(res, nrPrintItems)
        console.log(" ")
        db_client.release()

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
dashboardInterval()
