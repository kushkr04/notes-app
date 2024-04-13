import { useContext } from 'react';
import Card from '../card/card';
import { ColorLight, ColorDark, NoteType } from './note-type';
import './note.css';
import {FaEdit, FaTrash} from 'react-icons/fa';
import { ThemeContext } from '../../context/theme/theme';
import { DELETE_NOTE, SET_EDIT_MODE, SET_NOTE_FOR_EDIT } from '../../actions';
import { StateContext } from '../../context/state/state';
import { deleteNote } from '../../services/notes-service';

type NoteProps = {
    note: NoteType
}

function Note(props: NoteProps){
    const theme = useContext(ThemeContext);
    const {dispatch} = useContext(StateContext);
    const editNote = (note: NoteType)=>{
        dispatch({type: SET_EDIT_MODE,payload: true});
        dispatch({type: SET_NOTE_FOR_EDIT, payload: note});
      }
    const handleDelete = async (id:string)=>{
        await deleteNote(id);
        dispatch({type: DELETE_NOTE, payload: props.note.id});
    }
    return (
        <Card bgColor={theme === 'dark' ? props.note.level && ColorDark[props.note.level] : props.note.level && ColorLight[props.note.level]}>
            <>
            <div>{props.note.text}</div>
            <div className='left-corner date'>{props.note.updatedAt.toLocaleString()}</div>
            <div className='right-corner'>
                <FaEdit onClick={()=>editNote(props.note)}></FaEdit>
                <FaTrash onClick={()=>handleDelete(props.note.id)}></FaTrash>
            </div>
            </>
        </Card>
    )
}

export default Note;