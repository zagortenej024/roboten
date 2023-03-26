const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./models");
const routes = require("./routes");
const config = require(__dirname + "/config/config.json")[process.env.APP_ENV];


db.sequelize.sync().then(() => {
    console.log("Synced DB.");
}).catch((err) => {
    console.log("Failed to sync DB: " + err.message);
});


const app = express();
app.use(express.json());
app.use(config.api_base_url, routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(config.api_port, config.api_host, () => {
    console.log(`Server running at ${config.api_host}:${config.api_port}${config.api_base_url}`);
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/companies", function(req, res){
    res.render("company", {
        title: "roboten"
    })
});
