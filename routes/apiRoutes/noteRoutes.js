const router = require('express').Router();
const { deleteNotebyID, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});


router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
  if(notes.length === 0){
    req.body.id = "0";
  }else{
      req.body.id = notes.length.toString();
  }

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete('/notes/:id', (req, res) => {
    let note = deleteNotebyID(req.params.id, notes);
    res.json(note);
});

module.exports = router;
