import { useEffect, useState, useContext } from 'react'
import './add-note.css'
import {NoteType, Level} from '../note/note-type'
import {v4 as uuid4} from 'uuid'
import Card from '../card/card';
import { ThemeContext } from '../../context/theme/theme';
import { StateContext } from '../../context/state/state';
import { ADD_NOTE, SET_EDIT_MODE, UPDATE_NOTE } from '../../actions';
import { addNote, updateNote } from '../../services/notes-service';

function AddNote(){

    const [text, setText] = useState("");
    const [level, setLevel] = useState<Level>('low');
    const theme = useContext(ThemeContext);
    const {state, dispatch} = useContext(StateContext);

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setText(e.target.value);
    }
    const handleClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if (state.editMode && state.noteToEdit){
            const updatedNoteData = {
                text,
                level,
                id: state.noteToEdit.id,
                createdAt: state.noteToEdit.createdAt,
                updatedAt: new Date()
            };
            await updateNote(updatedNoteData);
            dispatch({type: UPDATE_NOTE,payload: updatedNoteData});
            dispatch({type: SET_EDIT_MODE,payload: false}); 
        } else {
            const noteData = {
                text,
                level,
                id: uuid4(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            await addNote(noteData);
            dispatch({type: ADD_NOTE,payload: noteData});
        }
        setText('');
        setLevel('low');

    }

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setLevel(e.target.value as Level)
    }

    const setNoteContent = (note: NoteType)=>{
        setText(note.text);
        setLevel(note.level)
    }

    useEffect(()=>{
        if (state.noteToEdit && state.editMode){
            setNoteContent(state.noteToEdit);
        }
    }, [state.noteToEdit, state.editMode])

    return (
        <Card bgColor={theme==='dark'?'#333':'#ddd'}>
            <form className='add-note'>
                <textarea onChange={handleChange} value={text}></textarea>
                {/* <input type="text" onChange={handleChange} value={text}/> */}
                <select onChange={handleSelect} value={level}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button onClick={handleClick}>{state.editMode?'edit':'add'}</button>
            </form>
        </Card>
    )
}

export default AddNote;