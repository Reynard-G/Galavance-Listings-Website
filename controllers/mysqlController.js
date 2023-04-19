/*const fastify = require("fastify")({ logger: true });
require("dotenv").config();

fastify.register(require('@fastify/mysql'), {
    promise: true,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

fastify.get('/listings', async (req, reply) => {
    const connection = await fastify.mysql.getConnection();
    const [rows, fields] = await connection.query(
        'SELECT * FROM listings',
    );
    connection.release();
    return await reply.send(rows);
});

const startServer = async () => {
    try {
        await fastify.listen({ port: 8080, host: "0.0.0.0" });
        fastify.log.info(`Listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

startServer();

fastify.inject({
    method: 'GET',
    url: '/listings'
}, (err, res) => {
    if (err) console.error(err);
    console.log(res.json());
});*/

const express = require("express");
const app = express();
const mysql = require("mariadb");
const port = 3000;

require("dotenv").config();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

app.get("/listings", (req, res) => {
    pool.getConnection()
        .then((conn) => {
            conn.query("SELECT * FROM listings")
                .then((rows) => {
                    res.send(rows);
                    conn.release();
                })
                .catch((err) => {
                    res.send(err);
                    conn.release();
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

app.listen(port, () => {
    console.log(`App listening at ${port}`);
});