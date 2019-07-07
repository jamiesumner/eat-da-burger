const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser")

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./controllers/burgers_controller");
app.use(router);

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});