const express = require("express");
const router = express.Router();
const rateLimiter = require("../middleware/rate-limiter");

module.exports = (pool) => {
    // Rate limit all requests
    router.use(rateLimiter);

    router.get("/", (req, res) => {
        res.send("Hello World!");
    });

    // Parse JSON bodies from MySQL queries
    router.get('/listings',  (req, res) => {
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
                        res.status(200).send(formattedRows);
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

    return router;
};
