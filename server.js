const express = require("express");
const path = require("path");
const fs = require("fs");
var notesDB = require("./Develop/db/db.json");

const app = express();
const PORT = process.env.PORT || 3001 ; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./Develop/public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/notes.html")));
app.get("/api/notes", (req,res) => {notesDb = fs.readFileSync ("./Develop/db/db.json", "UTF-8"), res.json(notesDB)});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));

app.post("/api/notes", (req, res) => {
//   req.body.id = notesDB;
  const newNote = { title: req.body.title,
                    text: req.body.text,
                    id: Math.floor(Math.random() * 1738)                       
};

  notesDB.push(newNote);

  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  notesDB = notesDB.filter(notes => notes.id != id);

  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));