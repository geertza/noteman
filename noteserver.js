var express = require("express");
var fs = require("fs");
var path = require("path");
var notesInfo = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'))

app.get("/api/notes", (req, res) => {
    return res.json(notesInfo);
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});