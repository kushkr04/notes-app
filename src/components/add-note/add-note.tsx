import { useEffect, useState, useContext } from 'react'
import './add-note.css'
import {NoteType, Level} from '../note/note-type'
import {v4 as uuid4} from 'uuid'
import Card from '../card/card';
import { ThemeContext } from '../../context/theme/theme';
import { StateContext } from '../../context/state/state';
import { ADD_NOTE, SET_EDIT_MODE, UPDATE_NOTE } from '../../actions';

function AddNote(){

    const [text, setText] = useState("");
    const [level, setLevel] = useState<Level>('low');
    const theme = useContext(ThemeContext);
    const {state, dispatch} = useContext(StateContext);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    }
    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if (state.editMode){
            state.noteToEdit && 
            dispatch({type: UPDATE_NOTE,payload: {
                text,
                level,
                id: state.noteToEdit.id
            }});
            dispatch({type: SET_EDIT_MODE,payload: false}); 
        } else {
            dispatch({type: ADD_NOTE,payload: {
                text,
                level,
                id: uuid4()
            }});
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
                <input type="text" onChange={handleChange} value={text}/>
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