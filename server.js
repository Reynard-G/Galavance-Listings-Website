const express = require("express");
const https = require("https");
const app = express();
const fs = require("fs");
const mysql = require("mariadb");
const bodyParser = require("body-parser");
const cors = require("cors");
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

const routes = require("./routes/routes")(pool);
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

const options = {
    key: fs.readFileSync("ssl/privkey.pem", "utf8"),
    cert: fs.readFileSync("ssl/fullchain.pem", "utf8"),
};

https.createServer(options, app).listen(port, () => {
    console.log(`Server running on port ${port}`);
});
