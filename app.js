import express from "express";
import expressLayouts from "express-ejs-layouts";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("src"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/tictactoe", (req, res) => {
    res.render("tictactoe")
});

app.get("/super_tictactoe", (req, res) => {
    res.render("super_tictactoe.ejs");
});

app.listen(port, () => {
    console.log("listening on port: ", port)
});

setInterval(() => {
    axios.get("https://tictactoe-5knv.onrender.com/");
}, 600000);