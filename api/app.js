const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const config = require(__dirname + "/config/config.json")[process.env.APP_ENV];


const app = express();
app.use(express.json());
app.use(config.base_url, routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(config.port, config.host, () => {
    console.log(`Server running at ${config.host}:${config.port}${config.base_url}`);
});

module.exports = app;
