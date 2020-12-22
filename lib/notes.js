const fs = require("fs");
const path = require("path");


function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  //synchronous version of fs.writeFile()
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    /*null argument means we don't want to edit any 
    existing data, 2 argument means we want to add 
    white space between values for readability*/
    JSON.stringify({notes: notesArray}, null, 2)
  );
  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }

  return true;
}

module.exports = {
    findById,
    createNewNote,
    validateNote
  };