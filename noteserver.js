var express = require("express");
var fs = require("fs");
var path = require("path");
var note = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json());


// savenotes 
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    note.push(newNote);
    let saveToJSON = JSON.stringify(note);
    fs.writeFile("./db/db.json", saveToJSON, function (err) {
        if (err) return console.log(err);
        console.log('fs write err=   ----'+err);
      });
    res.redirect('back');
   
} )

// display notes
app.get("/api/notes", (req, res) => {
    return res.json(note);
});


app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});


// deletes and resets to default must be entered in http bar
  app.get("/clear", function(req, res) {
    // Empty out the array of data
   
    let saveToJSON=JSON.stringify([{"title":"Test Title","text":"Test text"}]);
   fs.writeFile("./db/db.json", saveToJSON, function (err) {
    if (err) return console.log(err);
    console.log('clear fs write err'+err);
  });
    console.log(saveToJSON);
    res.redirect('back');
  });