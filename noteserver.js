var express = require("express");
var fs = require("fs");
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
    // create id parameter
    newNote.id= newNote.title;
    note.push(newNote);
    let saveToJSON = JSON.stringify(note);
    fs.writeFile("./db/db.json", saveToJSON, err => { if (err) throw err });
        
    res.redirect('back');
   
} )

// display note list and notes 
app.get("/api/notes", (req, res) => {
    return res.json(note);
});

// server listen
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});

// delete notes
app.delete("/api/notes/:id", (req, res) => {
    const deleted = note.findIndex((i) => i.id == req.params.id);
    note.splice(deleted, 1);
    let saveToJSON=JSON.stringify(note);
    fs.writeFile("./db/db.json", saveToJSON, err => { if (err) throw err });
    res.json(note);
    res.redirect('back');

});
// deletes and resets to default must be entered in http bar
  app.get("/clear", function(req, res) {
    // Empty out the array of data
   
    let saveToJSON=JSON.stringify([]);
    fs.writeFile("./db/db.json", saveToJSON, err => { if (err) throw err });
    res.redirect('back');
  });





  