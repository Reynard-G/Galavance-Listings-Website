const express = require("express");
const app = express();
const mysql = require("mariadb");
const router = express.Router();
const port = 3000;

require("dotenv").config();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

app.use('/', router);

// Parse JSON bodies from MySQL queries
app.get('/listings', (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    pool.getConnection()
        .then((conn) => {
            console.log("Database connection successful");
            conn.query("SELECT * FROM listings")
                .then((rows) => {
                    const formattedRows = rows.map(row => ({
                        ...row,
                        id: Number(row.id),
                        x: Number(row.x),
                        y: Number(row.y),
                        z: Number(row.z),
                        lat: row.lat === null ? null : Number(row.lat),
                        lng: row.lng === null ? null : Number(row.lng),
                    }));
                    console.log(formattedRows);
                    res.send(formattedRows);
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

// Update the database with the new lat, lng
app.post('/latlng', (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");

    // Grab the lat, lng, and id from the request body
    console.log(req.body);
    const { id, lat, lng } = req.body;

    // Update the database with the new lat, lng
    pool.getConnection()
        .then((conn) => {
            console.log("Database connection successful");
            conn.query(`UPDATE listings SET lat = ${lat}, lng = ${lng} WHERE id = ${id}`)
                .then((rows) => {
                    res.send(rows);
                })
                .catch((err) => {
                    res.send(err);
                })
                .finally(() => {
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
