import { useContext } from 'react';
import Card from '../card/card';
import { ColorLight, ColorDark, NoteType } from './note-type';
import './note.css';
import {FaEdit, FaTrash} from 'react-icons/fa';
import { ThemeContext } from '../../context/theme/theme';
import { DELETE_NOTE, SET_EDIT_MODE, SET_NOTE_FOR_EDIT } from '../../actions';
import { StateContext } from '../../context/state/state';
import { deleteNote } from '../../services/notes-service';
import { Link } from 'react-router-dom';

type NoteProps = {
    note: NoteType,
    isDetailed: boolean,
    height?: string
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
    const optionalProps = props.height ? {height: props.height}:{};
    return (
        <Card bgColor={theme === 'dark' ? props.note.level && ColorDark[props.note.level] : props.note.level && ColorLight[props.note.level]} 
        padding='1' 
        {...optionalProps}
        >
            <>
            {props.isDetailed ? (
                <div className={props.isDetailed?'text': 'text text-hide'}>{props.note.text}</div>
            ):(
            <Link to={props.note.id} style={{textDecoration: 'none', color: `${theme==='dark'?'white':'black'}`}}>
            <div className={props.isDetailed?'text': 'text text-hide'}>{props.note.text}</div>
            </Link>
            )}
            <div className='left-corner date'>{props.note.updatedAt.toLocaleString()}</div>
            {props.isDetailed ? null :
            <div className='right-corner'>
                <FaEdit onClick={()=>editNote(props.note)}></FaEdit>
                <FaTrash onClick={()=>handleDelete(props.note.id)}></FaTrash>
            </div>}
            </>
        </Card>
    )
}

export default Note;