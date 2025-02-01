const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/play", (req, res) => {
    res.render("play")
});

app.listen(port, () => {
    console.log("listening on port:", port)
});