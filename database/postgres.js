const { Pool, Client } = require('pg')
const parse = require("pg-connection-string").parse;
const fs = require('fs');

/*
connectionString = "postgresql://pushkar:tIY2vFDOwB4XcIKz0auhGA@free-tier6.gcp-asia-southeast1.cockroachlabs.cloud:26257/bank?sslmode=verify-full&options=--cluster%3Drapid-ambatkar-2247&sslrootcert=.certs\ca.crt";


const client = pool.connect();
*/

const config = {
    user: 'pushkar',
    host: 'free-tier6.gcp-asia-southeast1.cockroachlabs.cloud',
    database: 'rapid-ambatkar-2247.ecomm_sys',
    password: 'tIY2vFDOwB4XcIKz0auhGA',
    port: 26257,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('certs/root.crt').toString(),
    }
}

const pool = new Pool(config)
pool.connect(err => {
    if (err) {
        console.error('error connecting', err.stack)
    } else {
        console.log('Connected to CockcoarchDB!')
            //pool.end()
    }
});

module.exports = pool;