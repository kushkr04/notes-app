import './home.css';
import Note from '../../components/note/note'
import {Notes} from '../../components/note/data'
import AddNote from '../../components/add-note/add-note';
import { useContext, useState } from 'react';
import { Level, NoteType } from '../../components/note/note-type';
import { ThemeContext } from '../../context/theme/theme';

function Home() {
  const [notes, setNotes] = useState(Notes);
  const [editMode, setEditMode] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteType | null>(null);
  const theme = useContext(ThemeContext);
  const addNote = (note:NoteType)=>{
    if(note.text.length !== 0){
      setNotes([note, ...notes]);
    }
  }

  const editNote = (id:string)=>{
    const note = notes.find(note=>note.id===id);
    setEditMode(true);
    if(note){
      setNoteToEdit(note);
    }
  }

  const deleteNote = (id:string)=>{
    const index = notes.findIndex(note=>note.id===id);
    let editedNotes = [...notes];
    editedNotes.splice(index,1);
    setNotes(editedNotes);
  }

  const updateNote = (updatedNote: NoteType)=>{
    const index = notes.findIndex(note=>note.id===updatedNote.id);
    let editedNotes = [...notes];
    editedNotes.splice(index,1,updatedNote);
    setNotes(editedNotes);
    setEditMode(false);
  }

  return (
    <div className={`home ${theme}`}>
      <h2>Notes App [{notes.length}]</h2>
      <AddNote updateNote={updateNote} addNote={addNote} editMode={editMode} noteToEdit={noteToEdit}></AddNote>
      <div>
        {
          notes.map(note => <Note editNote={editNote} deleteNote={deleteNote} id={note.id} key={note.id} level={note.level as Level} text={note.text}></Note>)
        }
      </div>
    </div>
  );
}

export default Home;
