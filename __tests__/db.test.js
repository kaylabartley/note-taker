const fs = require('fs');
const { deleteNotebyID, createNewNote, validateNote } = require('../lib/notes');
const { notes } = require('../db/db');

 test('creates a note object', () => {
  const note = createNewNote({ title: 'Remember', text: 'jhgdja3ng2', id: notes.length.toString() }, notes);


  expect(note.title).toBe('Remember');
  expect(note.text).toBe('jhgdja3ng2');
  let newID = notes.length -1
  expect(note.id).toBe(newID.toString());
});

test('deletes note', () => {
    const startingArrayLength = notes.length;
    createNewNote({ title: 'HaHa', text: 'jxdfgch jfcg', id: notes.length.toString() }, notes);
    expect(notes.length).toBe(startingArrayLength+1);
    expect(notes).toEqual(expect.arrayContaining([{ title: 'HaHa', text: 'jxdfgch jfcg', id: (notes.length-1).toString() }]));
    const idValue = notes.length -1 ;
    deleteNotebyID(idValue.toString(), notes);
    expect(notes.length).toBe(startingArrayLength);
    expect(notes).toEqual(expect.not.arrayContaining([{ title: 'HaHa', text: 'jxdfgch jfcg', id: notes.length.toString() }]));
    

});

test('validates note', () => {
  const note = {
    title: 'Pick Up Kesha',
    text: 'Kesha needs to be picked up at 2 pm today'
  };

  const invalidNote = {
    title: 'Rem',
    text: 1
  };

  const result = validateNote(note);
  const result2 = validateNote(invalidNote);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
