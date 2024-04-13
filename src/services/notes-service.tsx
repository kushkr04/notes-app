import { NoteType } from "../components/note/note-type";

export async function fetchNotes(){
    const response = await fetch('/notes?_sort=updatedAt&_order=desc');
    const notes = await response.json();
    // to explicitly convert received date string to date object
    // return notes.map((note: NoteType)=>({...note, createdAt: new Date(note.createdAt)}));
    return notes;
  }
export async function addNote(note: NoteType){
    const response = await fetch('/notes',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
    });
    return await response.json();
  }
export async function deleteNote(id:string){
    const response = await fetch(`/notes/${id}`,{
        method: 'delete'
    });
    return await response.json();
  }
export async function updateNote(note:NoteType){
    const response = await fetch(`/notes/${note.id}`,{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
    });
    return await response.json();
  }