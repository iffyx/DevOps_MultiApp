const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
});

const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});

pgClient.on('error', () => console.log('No connection to PG DB'));

pgClient.query('CREATE TABLE IF NOT EXISTS results(number INT)').catch(err => console.log(err));

app.get('/', (req, resp) => {
   resp.send('Hello World from backend');
});

app.post('/power/', (req, resp) => {
    console.log(req.body);
    const base = req.body.base;
    const exponent = req.body.exponent;

    console.log(base);
    console.log(exponent);

    redisClient.get(base + ',' + exponent, (err, result) => {
        console.log(getPower(base, exponent));
        if (!result) {
            let powerResult = getPower(base, exponent);
            redisClient.set(base + ',' + exponent, powerResult);
            resp.send('New result ' + powerResult);
            pgClient.query('INSERT INTO results VALUES ($1)', [powerResult]).catch(err => console.log(err));
        }
        else {
            resp.send('Result ' + result);
        }
    });
});

app.get('/results', (req, resp) => {
    pgClient.query('SELECT * FROM results')
        .then(res => resp.send(res.rows))
        .catch(err => console.log(err));
});

app.listen(4000, err => {
    console.log('Server listening on 4000');
});

const getPower = (a, b) => {
    return Math.pow(a, b);
};