const express = require("express");
const router = express.Router();
const db = require("../models/");

router.get("/", function (req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
    db.Burger.findAll()
        .then(function (data) {
            console.log(data);
            const hbsObject = { burger: data };
            return res.render("index", hbsObject);
        });
});

router.post("/burgers/create", function (req, res) {
    db.Burger.create({
        burger_name: req.body.burger_name,
        devour: false
    })
        .then(function (dbBurger) {
            console.log(dbBurger);
            res.redirect("/burgers");
        });
});

router.put("/burgers/update", function (req, res) {
    db.Burger.update({
        devoured: true
    },
        {
            where: {
                id: req.body.burger_id
            }
        }
    ).then(function (dbBurger) {
        res.redirect("/");
    });
});

module.exports = router;