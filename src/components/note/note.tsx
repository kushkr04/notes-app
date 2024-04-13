import { useContext } from 'react';
import Card from '../card/card';
import { ColorLight, ColorDark } from './note-type';
import './note.css';
import {FaEdit, FaTrash} from 'react-icons/fa';
import { ThemeContext } from '../../context/theme/theme';

type NoteProps = {
    id: string,
    text: string,
    level?: 'low' | 'medium' | 'high',
    editNote: (id: string) => void,
    deleteNote: (id: string) => void
}

function Note(props: NoteProps){
    const theme = useContext(ThemeContext);
    return (
        <Card bgColor={theme === 'dark' ? props.level && ColorDark[props.level] : props.level && ColorLight[props.level]}>
            <>
            <div>
                {props.text}
            </div>
            <div className='right-corner'>
                <FaEdit onClick={()=>props.editNote(props.id)}></FaEdit>
                <FaTrash onClick={()=>props.deleteNote(props.id)}></FaTrash>
            </div>
            </>
        </Card>
    )
}

export default Note;