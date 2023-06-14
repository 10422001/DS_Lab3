const pg = require('pg')

const credentials = {
    user: "dominikocsofszki",
    host: "localhost",
    database: "dominikocsofszki",
    password: process.env.DB_PASSWORD,
    port: 5432
}

const pool = new pg.Pool(credentials);

pool.connect(function(err, client, done) {
    if(err) {
        return console.error('connexion error', err);
    }
    client.query("select * from users where username = ($1)", [username], function(err, result) {
        // call `done()` to release the client back to the pool
        done();

        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0]['username'])
    });
});
