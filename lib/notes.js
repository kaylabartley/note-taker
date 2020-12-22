const fs = require("fs");
const path = require("path");


function deleteNotebyID(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  if (!result) {
    return result;
  } else {
    let intID = parseInt(id);
    notesArray.splice(intID, 1);
    for(let i=intID; i < notesArray.length; i++){
        let idValue = parseInt(notesArray[i].id) - 1
        notesArray[i].id = idValue.toString();
    }
    //synchronous version of fs.writeFile()
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        /*null argument means we don't want to edit any 
        existing data, 2 argument means we want to add 
        white space between values for readability*/
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return notesArray;
  }
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
    deleteNotebyID,
    createNewNote,
    validateNote
  };