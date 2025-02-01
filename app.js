import express from "express";
import expressLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;

app.use(express.static("src"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.get("/", (req, res) => {
    res.render("play");
});

app.listen(port, () => {
    console.log("listening on port:", port)
});