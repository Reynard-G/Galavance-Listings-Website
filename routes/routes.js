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
    router.get('/listings', (req, res) => {
        console.log("Request received for /listings")

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "no-cache");

        pool.getConnection()
            .then((conn) => {
                conn.query("SELECT * FROM listings")
                    .then((rows) => {
                        const formattedRows = rows.map(row => ({
                            ...row,
                            id: Number(row.id),
                            x: Number(row.x),
                            y: Number(row.y),
                            z: Number(row.z),
                        }));
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

    router.get('/listings/images', (req, res) => {
        console.log("Request received for /listings/images")

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "no-cache");
    
        pool.getConnection()
            .then(async (conn) => {
                const rows = await conn.query("SELECT *, UNIX_TIMESTAMP(updated_at) AS updated_at_unix, UNIX_TIMESTAMP(created_at) AS created_at_unix FROM listings");
    
                const formattedRows = rows.map(row => ({
                    ...row,
                    id: Number(row.id),
                    x: Number(row.x),
                    y: Number(row.y),
                    z: Number(row.z),
                    updated_at_unix: Number(row.updated_at_unix),
                    created_at_unix: Number(row.created_at_unix),
                }));
    
                for (let i = 0; i < formattedRows.length; i++) {
                    const images = await conn.query(
                        `SELECT i.link FROM listings l ` +
                        `INNER JOIN listing_images il ON il.listing_id = l.id ` +
                        `INNER JOIN images i ON il.image_id = i.id ` +
                        `WHERE l.id = ?`
                        , [formattedRows[i].id]);
    
                    formattedRows[i].images = images;
                }
                res.status(200).send(formattedRows);
                conn.release();
            })
            .catch((err) => {
                res.send(err);
            });
    });

    router.get('/listings/:listingId/images', (req, res) => {
        console.log("Request received for /listings/:listingId/images")

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "no-cache");

        const listingId = req.params.listingId;
        pool.getConnection()
            .then((conn) => {
                conn.query(
                    `SELECT i.link FROM listings l ` +
                    `INNER JOIN listing_images il ON il.listing_id = l.id ` +
                    `INNER JOIN images i ON il.image_id = i.id ` +
                    `WHERE l.id = ?`
                    , [listingId])
                    .then((rows) => {
                        res.status(200).send(rows);
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
